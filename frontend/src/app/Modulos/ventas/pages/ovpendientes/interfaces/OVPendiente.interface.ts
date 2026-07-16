export interface OVPendiente {
	OrderDtl_OrderNum: number;
	OrderDtl_OrderLine: number;
	Part_PartNum: string;
	Part_PartDescription: string;
	Part_ProdCode: string;
	OrderDtl_CustNum: number;
	Customer_Name: string;
	OrderHed_OrderDate: string;
	OrderDtl_OrderQty: number;
	OrderDtl_SalesUM: string;
	OrderDtl_NUMCILINDROS_c: number;
	Calculated_Capacidad: number;
	OrderDtl_CVEENVASE_c: string;
	Calculated_DescCilindro: string;
	OrderDtl_LineStatus: string;
	OrderDtl_IUM: string;
	OrderHed_DocTotalCharges: number;
	OrderHed_DocTotalTax: number;
	OrderHed_DocOrderAmt: number;
	OrderHed_CVEOPERACION_c: string;
	Calculated_OperacionDesc: string;
	RowIdent: string;
}
