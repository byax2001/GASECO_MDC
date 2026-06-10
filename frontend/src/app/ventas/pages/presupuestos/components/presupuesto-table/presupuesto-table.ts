import { Component, effect, inject, input, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { VentasPresupuestoResponse } from '../../interface/VentasPresupuestoResponse.interface';
import { Modalg } from '../../../../../shared/components/modalg/modalg';

type PresupuestoRowForm = FormGroup<{
  customerCustID: FormControl<string>;
  customerName: FormControl<string>;
  partNum: FormControl<string>;
  partDescription: FormControl<string>;

  eneroBase: FormControl<number>;
  febreroBase: FormControl<number>;
  marzoBase: FormControl<number>;
  abrilBase: FormControl<number>;
  mayoBase: FormControl<number>;
  junioBase: FormControl<number>;
  julioBase: FormControl<number>;
  agostoBase: FormControl<number>;
  septiembreBase: FormControl<number>;
  octubreBase: FormControl<number>;
  noviembreBase: FormControl<number>;
  diciembreBase: FormControl<number>;

  eneroP: FormControl<number>;
  febreroP: FormControl<number>;
  marzoP: FormControl<number>;
  abrilP: FormControl<number>;
  mayoP: FormControl<number>;
  junioP: FormControl<number>;
  julioP: FormControl<number>;
  agostoP: FormControl<number>;
  septiembreP: FormControl<number>;
  octubreP: FormControl<number>;
  noviembreP: FormControl<number>;
  diciembreP: FormControl<number>;

  rowIdent: FormControl<string>;
}>;

@Component({
  selector: 'presupuesto-table',
  imports: [ReactiveFormsModule,FormsModule,ReactiveFormsModule, Modalg],
  templateUrl: './presupuesto-table.html',
  styleUrl: './presupuesto-table.css',
})
export class PresupuestoTable {
 private fb = inject(FormBuilder);
 porcentaje = signal<number>(0);
 presupuestoData = input.required<VentasPresupuestoResponse[]>()

  form = this.fb.nonNullable.group({
    porcentaje: [0, Validators.required],
    filas: this.fb.array<PresupuestoRowForm>([])
  });

  get filas(): FormArray<PresupuestoRowForm> {
    return this.form.controls.filas;
  }

  cargarDatos() {

    this.presupuestoData().forEach(row => {
      this.filas.push(this.crearFila(row));
    });
  }

  crearFila(row: VentasPresupuestoResponse): PresupuestoRowForm {
    return this.fb.nonNullable.group({
      customerCustID: row.Customer_CustID,
      customerName: row.Customer_Name,
      partNum: row.InvcDtl_PartNum,
      partDescription: row.Part_PartDescription,

      eneroBase: row.Calculated_Enero,
      febreroBase: row.Calculated_Febrero,
      marzoBase: row.Calculated_Marzo,
      abrilBase: row.Calculated_Abril,
      mayoBase: row.Calculated_Mayo,
      junioBase: row.Calculated_Junio,
      julioBase: row.Calculated_Julio,
      agostoBase: row.Calculated_Agosto,
      septiembreBase: row.Calculated_Septiembre,
      octubreBase: row.Calculated_Octubre,
      noviembreBase: row.Calculated_Noviembre,
      diciembreBase: row.Calculated_Diciembre,

      eneroP: 0,
      febreroP: 0,
      marzoP: 0,
      abrilP: 0,
      mayoP: 0,
      junioP: 0,
      julioP: 0,
      agostoP: 0,
      septiembreP: 0,
      octubreP: 0,
      noviembreP: 0,
      diciembreP: 0,

      rowIdent: row.RowIdent
    });
  }

  aplicarPorcentaje() {
    const porcentaje = Number(this.form.controls.porcentaje.value) / 100;

    this.filas.controls.forEach(fila => {
      fila.patchValue({
        eneroP: fila.controls.eneroBase.value+ fila.controls.eneroBase.value * porcentaje,
        febreroP: fila.controls.febreroBase.value + fila.controls.febreroBase.value * porcentaje,
        marzoP: fila.controls.marzoBase.value + fila.controls.marzoBase.value * porcentaje,
        abrilP: fila.controls.abrilBase.value + fila.controls.abrilBase.value * porcentaje,
        mayoP: fila.controls.mayoBase.value + fila.controls.mayoBase.value * porcentaje,
        junioP: fila.controls.junioBase.value + fila.controls.junioBase.value * porcentaje,
        julioP: fila.controls.julioBase.value + fila.controls.julioBase.value * porcentaje,
        agostoP: fila.controls.agostoBase.value + fila.controls.agostoBase.value * porcentaje,
        septiembreP: fila.controls.septiembreBase.value + fila.controls.septiembreBase.value * porcentaje,
        octubreP: fila.controls.octubreBase.value + fila.controls.octubreBase.value * porcentaje,
        noviembreP: fila.controls.noviembreBase.value + fila.controls.noviembreBase.value * porcentaje,
        diciembreP: fila.controls.diciembreBase.value + fila.controls.diciembreBase.value * porcentaje,
      });
    });
  }

  guardar() {
    console.log(this.form.getRawValue().filas);
  }

  constructor() {
    effect(() => {
      const data = this.presupuestoData();

      const filasArray = this.fb.array<PresupuestoRowForm>(
        data.map(row => this.crearFila(row))
      );

      this.form.setControl('filas', filasArray);
      });
    }

  }
