export interface TCilindros {
    UDCodes_CodeID:         string;
    UDCodes_CodeDesc:       string;
    UDCodes_NUMERO01_c:     number;
    Calculated_Propietario: CalculatedPropietario;
    RowIdent:               string;
}

export enum CalculatedPropietario {
    Ajeno = "AJENO",
    AjenoMedicinal = "AJENO MEDICINAL",
    Propio = "PROPIO",
    PropioMedicinal = "PROPIO MEDICINAL",
}
