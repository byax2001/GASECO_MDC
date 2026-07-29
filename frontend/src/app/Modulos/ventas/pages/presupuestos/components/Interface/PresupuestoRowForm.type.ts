import { FormControl, FormGroup } from '@angular/forms';

export type PresupuestoRowForm = FormGroup<{
  CustID: FormControl<string>;
  customerName: FormControl<string>;
  TipoCustomer: FormControl<string>;
  partNum: FormControl<string>;
  partDescription: FormControl<string>;
  Calculated_UOM: FormControl<string>;
  precioU: FormControl<number>;
  CodVendedor: FormControl<string>;
  Anio: FormControl<number>;

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