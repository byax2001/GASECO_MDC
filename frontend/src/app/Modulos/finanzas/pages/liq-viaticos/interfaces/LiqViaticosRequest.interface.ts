export interface LiqViaticosForm {
  header: LiqViaticosHeader;
  facturas: LiqViaticosFactura[];
}

export interface LiqViaticosHeader {
  company: string;
  usuario: string;
  desUsuario: string;
  idLiqVia: number;
  moneda: string;
  fhLiqVia: string;
  descLiqVia: string;
  montoAutorizado: number;
  posteada: boolean;
}

export interface LiqViaticosFactura {
  NombreProveedor: string;
  NitRtn: string;
  NumeroFactura: string;
  Serie: string;
  MontoFactura: number;
  CuentaGl: string;
  Impuesto: number;
  TipoFactura: string;
  DescripcionFactura: string;
  FechaFactura: string;
}