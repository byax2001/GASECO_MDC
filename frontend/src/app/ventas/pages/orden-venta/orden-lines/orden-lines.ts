import { Component, computed, HostListener, inject, input, Input, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import UOM from '../../../interfaces/uom.interface';
import { Parte } from '../../../interfaces/parte.interface';
import { PartOV } from '../components/interface/PartOV.interface';
import { VentasQueryService } from '../../../services/ventasquery.service';
import { TCilindros } from '../../../interfaces/TCilindros.interface';
import { PartUOM } from '../../../interfaces/PartUOM.interface';
import { AddLineOvRequest } from '../components/interface/AddLineOvRequest.interface';
import { AddLineOvResponse } from '../components/interface/AddLineOvResponse.interface';
import { Observable } from 'rxjs';

type LineaOvForm = FormGroup<{
  noLinea: FormControl<number>;
  parte: FormControl<string>;
  cilindros: FormControl<number>;
  presentacion: FormControl<string>;
  uom: FormControl<string>;
  precio: FormControl<number>;
  ncertificado: FormControl<boolean>;
  Qty: FormControl<number>;
  total: FormControl<number>;
}>;



@Component({
  selector: 'Orden-lines',
  imports: [ReactiveFormsModule],
  templateUrl: './orden-lines.html',
  styleUrl: './orden-lines.css',
})

export class OrdenLines {
  //Codigo de Cliente
  custID = input.required<string>();
  CustNum = input.required<number>();
  OrderNum = input.required<number>();
  //Moneda de la Orden de venta
  currencyCode = input.required<string>();
  //Representa una linea de pedido
  private fb = new FormBuilder();
  //Formulario principal que contiene un FormArray de líneas de pedido
  form = this.fb.nonNullable.group({
    lineas: this.fb.array<LineaOvForm>([])
  });
  //Servicio para obtener datos relacionados con ventas, como partes, UOMs, precios, etc.
  private ventasQueryService = inject(VentasQueryService);
  
  //Partes disponibles para la orden de venta, se cargan al iniciar el componente en el combobox
  Parts = signal<PartOV[]>([]);
  //UOMs por línea, se actualizan dinámicamente al seleccionar una parte
  uomsPorLinea = signal<Record<number, PartUOM[]>>({});
  //Tipos de cilindros disponibles para la orden de venta, se cargan al iniciar el componente en el combobox
  Presentaciones = signal<TCilindros[]>([]);
  
  //APARTADO PARA VERIFICAR SI EL USUARIO ESTA EN MOVIL O DESKTOP
  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 768);
  }
  isMobile = signal(window.innerWidth < 768);


  get lineas() {
    return this.form.get('lineas') as FormArray;
  }

  //TIPAR FORMULARIO:
  

  // Método para crear una nueva línea de pedido con valores por defecto
  // Se utiliza al agregar una nueva línea para inicializar el formulario de la línea
  createLinea(parte = '', cilindros = 0, presentacion = 0, uom = 'UND') {
    const group = this.fb.nonNullable.group({
      noLinea: [0],
      parte: [parte, Validators.required],
      cilindros: [cilindros, [Validators.required, Validators.min(0)]],
      presentacion: [presentacion, [Validators.required, Validators.min(0)]],
      uom: [uom, Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      ncertificado: [false, Validators.required],
      Qty: [{ value: cilindros * presentacion, disabled: true }],
      total: [{ value: cilindros * presentacion * 0, disabled: true }],
    });

    group.get('uom')?.valueChanges.subscribe(uom => {

        const presCtrl = group.get('presentacion');

        if (uom === 'UND' || uom === 'SERV') {
          presCtrl?.setValue(1);
          presCtrl?.disable({ emitEvent: false });
        } else {
          presCtrl?.enable({ emitEvent: false });
        }

    });

    //Escucha constantemente los cambios en los campos relevantes para calcular el total (cilindros, presentación, precio y UOM)
    group.valueChanges.subscribe(value => {
      //EN EL CASO DE QUE LA UNIDAD SEA UND O SER LA PRESENTACION SE CONSIDERA 1, 
      //DE LO CONTRARIO SE TOMA EL VALOR INGRESADO EN PRESENTACION
      const uom = value.uom;
      const presentacion = (uom === 'UND' || uom === 'SER')
        ? 1
        : Number(value.presentacion ?? 0);

      const qty = Number(value.cilindros ?? 0) * presentacion; //Cantidad de Producto a vender
      const total = qty *Number(value.precio ?? 0); //Total de la línea (Cantidad * Precio Unitario)

      
      group.get('Qty')?.setValue(qty, { emitEvent: false });
      group.get('total')?.setValue(total, { emitEvent: false });
    });

    return group;
  }

  //AL INICIAR EL COMPONENTE:
  ngOnInit() {
    //OBTENER PARTES PARA ORDEN DE VENTA
    this.ventasQueryService.getPartOv().subscribe({
      next: (partes) => {
        this.Parts.set(partes);
      },
      error: (err) => {
        console.error('Error al obtener partes para orden de venta:', err);
      }
    });

    //OBTENER PRESENTACIONES DE CILINDROS PARA ORDEN DE VENTA
    this.ventasQueryService.getTipoCilindros().subscribe({
      next: (presentaciones) => {
        this.Presentaciones.set(presentaciones);
      },
      error: (err) => {
        console.error('Error al obtener presentaciones de cilindros para orden de venta:', err);
      }
    });
  }

  //Metodo para agregar una linea de pedido en blanco, se pueden agregar tantas como se necesiten
  addLinea(): void {
    this.lineas.push(this.createLinea());
  }

  // Metodo para eliminar una línea del pedido, 
  // también se encarga de actualizar las UOMs por línea para evitar inconsistencias en los índices
  // Por tanto elimina la lista de uoms de la línea eliminada y desplaza las siguientes para llenar 
  // el espacio
  removeLinea(index: number): void {
    this.lineas.removeAt(index);

    this.uomsPorLinea.update(current => {
      const updated: Record<number, PartUOM[]> = {};

      Object.entries(current).forEach(([key, value]) => {
        const oldIndex = Number(key);

        if (oldIndex < index) {
          updated[oldIndex] = value;
        }

        if (oldIndex > index) {
          updated[oldIndex - 1] = value;
        }
      });

      return updated;
    });
  }


  // Método para actualizar las UOM disponibles al cambiar la parte
  // Colocar el UOM default 
  // Colocar el precio unitario basado en la parte, UOM, cliente y moneda seleccionados
  onParteChange(index: number) {

    const linea = this.lineas.at(index);
    const partNum = linea.get('parte')?.value;

    this.ventasQueryService.getPartUOM(partNum).subscribe({

      next: (uoms) => {

        this.uomsPorLinea.update(current => ({
          ...current,
          [index]: uoms
        }));

        const defaultUom = uoms.find(
          u => u.Calculated_IUMDefault === 1
        );

        linea.get('uom')?.setValue(
          defaultUom?.UOMConv_UOMCode ?? ''
        );
        this.ChangeUnitPrice(index);
      }

    });

  }

  // Método para cambiar el precio unitario de la Parte
  ChangeUnitPrice(index: number) {
    //Se obtiene la linea actual (formulario) para obtener el PartNum y UOM seleccionados
    const linea = this.lineas.at(index);
    //Se obtiene el PartNum y UOM seleccionados en la línea actual
    const partNum = linea.get('parte')?.value;
    const uom = linea.get('uom')?.value;
    const custID = this.custID();
    const currencyCode = this.currencyCode();
    if (!partNum || !uom || !custID || !currencyCode) {
      console.log('Faltan datos para obtener el precio unitario. Parte:', partNum, 'UOM:', uom, 'CustID:', custID, 'CurrencyCode:', currencyCode);
      return;
    }
    //Se llama al servicio para obtener el precio unitario basado en el PartNum, UOM, CustID y CurrencyCode
    this.ventasQueryService.getPrecioUnitario(partNum, uom, custID, currencyCode).subscribe({
      next: (precios) => {
        console.log('Precios obtenidos para Parte:', partNum, 'UOM:', uom, 'CustID:', custID, 'CurrencyCode:', currencyCode, precios);
        const precioUnitario = precios[0]?.PriceLstParts_BasePrice ?? 0;
        linea.get('precio')?.setValue(precioUnitario);
      },
      error: (err) => {
        console.error('Error al obtener precio unitario:', err);
        linea.get('precio')?.setValue(0);
      }
    });

  }

  AgregarLineasOv(OrderNum: number):Observable<AddLineOvResponse> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return new Observable<AddLineOvResponse>(subscriber => {
        subscriber.error('El formulario contiene errores. Por favor, corríjalos antes de agregar las líneas a la orden de venta.');
      });
    }
    const lineasPedido: AddLineOvRequest[] =   this.form.getRawValue().lineas.map(linea => ({
      CustID: this.custID(),
      CustNum: this.CustNum(),
      PartNum: linea.parte,
      NoCilindros: linea.cilindros,
      TipoCilindro: linea.presentacion,
      Qty: linea.Qty,
      PrecioUnit: linea.precio,
      UOM: linea.uom,
      OrderNum: OrderNum
    }));

    return this.ventasQueryService.postAddLineas(lineasPedido)
  }

}