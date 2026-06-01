import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import UOM from '../../../interfaces/uom.interface';
import { Parte } from '../../../interfaces/parte.interface';
import { PartOV } from '../../../interfaces/PartOV.interface';
import { VentasQueryService } from '../../../services/ventasquery.service';
import { TCilindros } from '../../../interfaces/TCilindros.interface';
import { PartUOM } from '../../../interfaces/PartUOM.interface';

@Component({
  selector: 'Orden-lines',
  imports: [ReactiveFormsModule],
  templateUrl: './orden-lines.html',
  styleUrl: './orden-lines.css',
})
export class OrdenLines {
  custID = input.required<string>();
  currencyCode = input.required<string>();
  private fb = new FormBuilder();
  private ventasQueryService = inject(VentasQueryService);

  Parts = signal<PartOV[]>([]);
  //UOMs por línea, se actualizan dinámicamente al seleccionar una parte
  uomsPorLinea = signal<Record<number, PartUOM[]>>({});

  Presentaciones = signal<TCilindros[]>([]);

  form = this.fb.nonNullable.group({
    lineas: this.fb.array([])
  });

  get lineas() {
    return this.form.get('lineas') as FormArray;
  }

  createLinea(parte = '', cilindros = 0, presentacion = 0, uom = 'UND') {
    const group = this.fb.nonNullable.group({
      parte: [parte, Validators.required],
      cilindros: [cilindros, [Validators.required, Validators.min(0)]],
      presentacion: [presentacion, [Validators.required, Validators.min(0)]],
      uom: [uom, Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      ncertificado: [false, Validators.required],
      total: [{ value: cilindros * presentacion * 0, disabled: true }],
    });

    group.valueChanges.subscribe(value => {
      const total =
        Number(value.cilindros ?? 0) *
        Number(value.presentacion ?? 0) *
        Number(value.precio ?? 0);

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

  addLinea(): void {
    this.lineas.push(this.createLinea());
  }

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

  getLineasPedido() {
    return this.form.getRawValue().lineas;
  }

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

}