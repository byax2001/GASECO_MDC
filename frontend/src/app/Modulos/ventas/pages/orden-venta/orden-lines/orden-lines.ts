import { Component, computed, HostListener, inject, input, Input, signal, ChangeDetectionStrategy, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { PartOV } from '../components/interface/PartOV.interface';
import { VentasQueryService } from '../../../services/ventasquery.service';
import { TCilindros } from '../../../interfaces/TCilindros.interface';
import { PartUOM } from '../../../interfaces/PartUOM.interface';
import { AddLineOvRequest } from '../components/interface/AddLineOvRequest.interface';
import { AddLineOvResponse } from '../components/interface/AddLineOvResponse.interface';
import { Observable, of } from 'rxjs';
import { Correo } from '../../../../../interfaces/Correo.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserInfoService } from '../../../../../services/userInfo.service';

type LineaOvForm = FormGroup<{
  noLinea: FormControl<number>;
  parte: FormControl<string>;
  descripcion: FormControl<string>;
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
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './orden-lines.css',
})

export class OrdenLines {
  //Codigo de Cliente
  userInfoService = inject(UserInfoService);
  custID = input.required<string>();
  CustNum = input.required<number>();
  OrderNum = input.required<number>();
  TipoCilindros = input.required<string>();
  AddDelLine = output();

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
  
  //UOMs por línea, se actualizan dinámicamente al seleccionar una parte
  uomsPorLinea = signal<Record<number, PartUOM[]>>({});
  //Tipos de cilindros disponibles para la orden de venta, se cargan al iniciar el componente en el combobox
  Presentaciones = rxResource<TCilindros[], { company: string | null }>({
      params: () => ({
        company: this.userInfoService.company()
      }),
      stream: ({ params }) => {
        if (!params.company) {
          return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
        }
        return this.ventasQueryService.getTipoCilindros();
      }
    }); 

  //PARTES DISPONIBLES PARA LA ORDEN DE VENTA
  Parts = rxResource<PartOV[], { company: string | null }>({
    params: () => ({
      company: this.userInfoService.company()
    }),
    stream: ({ params }) => {
      if (!params.company) {
        return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
      }
      return this.ventasQueryService.getPartOv();
    }
  });

  //APARTADO PARA VERIFICAR SI EL USUARIO ESTA EN MOVIL O DESKTOP
  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 768);
  }
  isMobile = signal(window.innerWidth < 768);


  get lineas() {
    return this.form.get('lineas') as FormArray;
  }



  //FILTRAR PRESENTACIONES:
  PresentacionesFiltradas = computed(() => {
    const tipo = this.TipoCilindros();
      return (this.Presentaciones.value()??[]).filter(p =>
        p.Calculated_Propietario === tipo
      );
  });
  

  // Método para crear una nueva línea de pedido con valores por defecto
  // Se utiliza al agregar una nueva línea para inicializar el formulario de la línea
  createLinea(parte = '', cilindros = 0, presentacion = 0, uom = 'UND') {
    const group = this.fb.nonNullable.group({
      noLinea: [0],
      parte: [parte, Validators.required],
      cilindros: [cilindros, [Validators.required, Validators.min(0)]],
      presentacion: [presentacion, [Validators.required, Validators.min(0)]],
      uom: [uom, Validators.required],
      descripcion: [ '', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      ncertificado: [false, Validators.required],
      Qty: [{ value: cilindros * presentacion, disabled: true }],
      total: [{ value: cilindros * presentacion * 0, disabled: true }],
    });
    //Si es UND o SERV se bloquea la presentacion y se coloca 1, de lo contrario se habilita para que el usuario pueda colocar la presentacion deseada
    group.get('uom')?.valueChanges.subscribe(uom => {

        const presCtrl = group.get('presentacion');

        if (uom === 'UND' || uom === 'SERV') {
          //Se coloca 1 por default y se bloquea el campo de presentación
          presCtrl?.setValue(1);
          //presCtrl?.disable({ emitEvent: false });
        } else {
          //presCtrl?.enable({ emitEvent: false });
        }

    });

    //Escucha constantemente los cambios en los campos relevantes para calcular el total (cilindros, presentación, precio y UOM)
    group.valueChanges.subscribe(value => {
      //EN EL CASO DE QUE LA UNIDAD SEA 'UND','SER' LA PRESENTACION SE CONSIDERA 1, 
      //DE LO CONTRARIO SE TOMA EL VALOR INGRESADO EN PRESENTACION
      const uom = value.uom;
      const qtyPres = (uom === 'UND' || uom === 'SER' || uom?.includes('U_') || uom?.includes('A_'))
        ? 1
        : this.qtyPresentación(String(value.presentacion));

      const qty = Number(value.cilindros ?? 0) * Number(qtyPres); //Cantidad de Producto a vender
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
  }

  //Metodo para agregar una linea de pedido en blanco, se pueden agregar tantas como se necesiten
  addLinea(): void {
    this.lineas.push(this.createLinea());
    this.AddDelLine.emit();
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
    this.AddDelLine.emit();
  }


  // Método para actualizar las UOM disponibles al cambiar la parte
  // Colocar el UOM default 
  // Colocar el precio unitario basado en la parte, UOM, cliente y moneda seleccionados
  onParteChange(index: number) {

    const linea = this.lineas.at(index);
    const partNum = linea.get('parte')?.value;

    // SE BUSCA LAS UOMS DISPONIBLES PARA LA PARTE SELECCIONADA Y 
    // SE SETEA POR DEFAULT LA UOM QUE TIENE ASIGNADA COMO DEFAULT EN EL SISTEMA EPICOR
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
        //SE OBTIENE EL PRECIO UNITARIO BASADO EN LA PARTE, UOM, CLIENTE Y MONEDA SELECCIONADOS
        this.ChangeUnitPrice(index);
      }

    });

    //AGREGAR DESCRIPCION DE LA PARTE SELECCIONADA
    const parteSeleccionada = (this.Parts.value()??[]).find(p => p.Part_PartNum === partNum);
    if (parteSeleccionada) {
      linea.get('descripcion')?.setValue(parteSeleccionada.Part_PartDescription);
    } else {
      linea.get('descripcion')?.setValue('');
    }

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
      OrderNum: OrderNum,
      Descripcion: linea.descripcion
    }));

    return this.ventasQueryService.postAddLineas(lineasPedido)
  }

  //RETORNA LA CANTIDAD QUE REPRESENTA LA PRESENTACION EN BASE A SU CODIGO, 
  // SE UTILIZA PARA CALCULAR LA CANTIDAD TOTAL A VENDER EN BASE AL NUMERO DE CILINDROS 
  // Y LA PRESENTACION
  qtyPresentación(presentacion: string):Number{
    return (this.Presentaciones.value()??[])
    .find(p => p.UDCodes_CodeID === presentacion)
    ?.UDCodes_NUMERO01_c ?? 0;
  }

  // Método para enviar la estructura del correo
  getCorreo():Correo {
      const correoData:Correo= {
        para: '',
        copia: 'facturacion@gasecosa.com;aux.logistica@gasecosa.com',
        asunto: `Orden de Venta ${this.OrderNum()} Creada`,
        mensaje: ``
      }
      //Si alguna linea esta con certificado se debe de copiar a rgc@gasecosa.com;
      let ncertificado = 0;
      this.form.getRawValue().lineas.forEach(linea => {
        if(linea.ncertificado){
          correoData.copia += ';rgc@gasecosa.com';
          if(ncertificado === 0){
            correoData.mensaje += '\n\nNota: Esta orden de venta contiene líneas que requieren certificado de calidad.';
            ncertificado++;
          }
        }
      });

      //Desglose de las lineas del pedido para incluir en el cuerpo del correo
      const lineasPedido = this.form.getRawValue().lineas.map(linea => `
        Parte: ${linea.parte}, 
        Cilindros: ${linea.cilindros}, 
        Presentación: ${linea.presentacion}, 
        UOM: ${linea.uom}, 
        Precio Unitario: ${linea.precio}, 
        Cantidad Total: ${linea.Qty}, 
        Certificado: ${linea.ncertificado ? 'Sí' : 'No'},
        Total Línea: ${linea.total}
      `).join('\n');  
      correoData.mensaje += '\n\nDetalles de la Orden de Venta:\n' + lineasPedido;
      return correoData;
  }

}