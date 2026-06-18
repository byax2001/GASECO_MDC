export interface VentasPresupuestoResponse {
    Customer_CustID:       string;
    Customer_Name:         string;
    Customer_TipoCustomer_c: string;
    InvcDtl_PartNum:       string;
    Part_PartDescription:  string;
    InvcDtl_SalesUM:       string;
    Calculated_PrecioU:    number;
    Calculated_Enero:      number;
    Calculated_Febrero:    number;
    Calculated_Marzo:      number;
    Calculated_Abril:      number;
    Calculated_Mayo:       number;
    Calculated_Junio:      number;
    Calculated_Julio:      number;
    Calculated_Agosto:     number;
    Calculated_Septiembre: number;
    Calculated_Octubre:    number;
    Calculated_Noviembre:  number;
    Calculated_Diciembre:  number;
    RowIdent:              string;
}
