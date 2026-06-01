export interface PrecioUnitario {
    PriceLstParts_BasePrice?: number | string;
    PartNum?: string;
    UOM?: string;
    Price?: number; // precio unitario
    CurrencyCode?: string;
    PriceList?: string; // lista de precios aplicable
    CustID?: string;
    RowIdent?: string;
    [key: string]: any;
}
