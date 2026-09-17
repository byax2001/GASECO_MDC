import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface LiqViaticosFormControls {
  header: FormGroup<LiqViaticosHeaderControls>;
  facturas: FormArray<FormGroup<LiqViaticosFacturaControls>>;
}

export interface LiqViaticosHeaderControls {
  company: FormControl<string>;
  usuario: FormControl<string>;
  desUsuario: FormControl<string>;
  idLiqVia: FormControl<number>;
  moneda: FormControl<string>;
  fhLiqVia: FormControl<string>;
  descLiqVia: FormControl<string>;
  montoAutorizado: FormControl<number>;
  posteada: FormControl<boolean>;
}

export interface LiqViaticosFacturaControls {
    NombreProveedor: FormControl<string>;
    NitRtn: FormControl<string>;
    NumeroFactura: FormControl<string>;
    Serie: FormControl<string>;
    MontoFactura: FormControl<number>;
    CuentaGl: FormControl<string>;
    Impuesto: FormControl<string>;
    TipoFactura: FormControl<string>;
    DescripcionFactura: FormControl<string>;
    FechaFactura: FormControl<string>;
}

