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
import * as XLSX from 'xlsx';
import { VentasPresupuestoResponse } from '../../interface/VentasPresupuestoResponse.interface';
import { DecimalPipe } from '@angular/common';

type PresupuestoRowForm = FormGroup<{
  CustID: FormControl<string>;
  customerName: FormControl<string>;
  TipoCustomer: FormControl<string>;
  partNum: FormControl<string>;
  partDescription: FormControl<string>;
  precioU: FormControl<number>;

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

  porcentaje: FormControl<number>;

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
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, DecimalPipe],
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

  // Crear un FormGroup para cada fila de datos, 
  // inicializando los controles con los valores base y calculados
  crearFila(row: VentasPresupuestoResponse): PresupuestoRowForm {
    const fila = this.fb.nonNullable.group({
      CustID: row.Customer_CustID,
      customerName: row.Customer_Name,
      TipoCustomer: row.Customer_TipoCustomer_c,
      partNum: row.InvcDtl_PartNum,
      partDescription: row.Part_PartDescription,
      precioU: row.Calculated_PrecioU,

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

      porcentaje: 0,

      eneroP: [{ value: row.Calculated_Enero, disabled: false }],
      febreroP: [{ value: row.Calculated_Febrero, disabled: false }],
      marzoP: [{ value: row.Calculated_Marzo, disabled: false }],
      abrilP: [{ value: row.Calculated_Abril, disabled: false }],
      mayoP: [{ value: row.Calculated_Mayo, disabled: false }],
      junioP: [{ value: row.Calculated_Junio, disabled: false }],
      julioP: [{ value: row.Calculated_Julio, disabled: false }],
      agostoP: [{ value: row.Calculated_Agosto, disabled: false }],
      septiembreP: [{ value: row.Calculated_Septiembre, disabled: false }],
      octubreP: [{ value: row.Calculated_Octubre, disabled: false }],
      noviembreP: [{ value: row.Calculated_Noviembre, disabled: false }],
      diciembreP: [{ value: row.Calculated_Diciembre, disabled: false }],

      rowIdent: row.RowIdent

    });

    fila.controls.porcentaje.valueChanges.subscribe(porcentaje => {
      this.aplicarPorcentajeFila(fila, porcentaje);
    });

    return fila;
  }

  //APLICAR UN PORCENTAJE A UNA FILA EN ESPECIFICO
  aplicarPorcentajeFila(fila: PresupuestoRowForm, porcentajeValue: number) {
    const porcentaje = Number(porcentajeValue || 0) / 100;

    fila.patchValue({
      eneroP: fila.controls.eneroBase.value + fila.controls.eneroBase.value * porcentaje,
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
    }, { emitEvent: false });
  }

  // APLICAR PORCENTAJE A TODAS LAS FILAS
  aplicarPorcentaje() {
    const porcentaje = this.form.controls.porcentaje.value;
    this.filas.controls.forEach(fila => {
      fila.controls.porcentaje.setValue(porcentaje);
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

  //DESCARGAR COMO EXCEL EL PRESUPUESTO:

  descargarExcel() {
  const filas = this.form.getRawValue().filas;

  const data = filas.map(f => ({
    CustID: f.CustID,
    customerName: f.customerName,
    TipoCustomer: f.TipoCustomer,
    PartNum: f.partNum,
    PartDescription: f.partDescription,
    PrecioU: f.precioU,

    EneroBase: f.eneroBase,
    FebreroBase: f.febreroBase,
    MarzoBase: f.marzoBase,
    AbrilBase: f.abrilBase,
    MayoBase: f.mayoBase,
    JunioBase: f.junioBase,
    JulioBase: f.julioBase,
    AgostoBase: f.agostoBase,
    SeptiembreBase: f.septiembreBase,
    OctubreBase: f.octubreBase,
    NoviembreBase: f.noviembreBase,
    DiciembreBase: f.diciembreBase,

    porcentaje: f.porcentaje,

    EneroP: f.eneroP,
    FebreroP: f.febreroP,
    MarzoP: f.marzoP,
    AbrilP: f.abrilP,
    MayoP: f.mayoP,
    JunioP: f.junioP,
    JulioP: f.julioP,
    AgostoP: f.agostoP,
    SeptiembreP: f.septiembreP,
    OctubreP: f.octubreP,
    NoviembreP: f.noviembreP,
    DiciembreP: f.diciembreP
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Presupuesto'
  );

  XLSX.writeFile(
    workbook,
    'Presupuesto.xlsx'
  );
}

}
