import { Component, inject, signal, ViewChild } from '@angular/core';
import { OVPendienteTable } from "./components/ovpendiente-table/ovpendiente-table";
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateInput } from "../../../../shared/components/date-input/date-input";
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { OVPendiente } from './interfaces/OVPendiente.interface';
import { OVPendientesService } from '../../services/ovpendientes.service';
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { FilesAdmin } from '../../../../services/files-admin.service';

@Component({
  selector: 'ovpendientes',
  imports: [OVPendienteTable, HeaderPage, FormsModule, ReactiveFormsModule, DateInput, ButtonIcon, Modalg, SpinnerLoad],
  templateUrl: './ovpendientes.html',
  styleUrl: './ovpendientes.css',
})
export default class OVPendientes {
  //Primero se declara el FormBuilder y se inyecta en la clase
  private fb = inject(FormBuilder);
  //Luego se declara el FormGroup y se inicializa con el FormBuilder
  //Se utiliza el método nonNullable para que los controles no puedan ser nulos
  formDate = this.fb.nonNullable.group({
    fechaI: ['', Validators.required],
    fechaF: ['', Validators.required],
  })

  @ViewChild('modalG') modalG!: Modalg;
  OVPendientes= signal<OVPendiente[]>([]);
  ovpendientesService = inject(OVPendientesService);
  adminFileService = inject(FilesAdmin);
  loading = signal(false);


  search() {
    //Evitar que se haga la búsqueda si ya se está cargando
    if(this.loading()) return;
    this.loading.set(true);

    const fechaI = this.formDate.get('fechaI')?.value;
    const fechaF = this.formDate.get('fechaF')?.value;

    if (this.formDate.invalid || !fechaI || !fechaF ) {
      this.modalG.showModalG('Error', 'Debe seleccionar un rango de fechas válido');
      this.loading.set(false);
      this.formDate.markAllAsTouched();
      return;
    }

    if(fechaF < fechaI){
      this.modalG.showModalG('Error', 'La fecha final no puede ser menor a la fecha inicial');
      this.formDate.markAllAsTouched();
      this.loading.set(false);
      return;
    }

    this.ovpendientesService.getOvPendientes(fechaI, fechaF).subscribe({
      next: (data) => {
        this.OVPendientes.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.modalG.showModalG('Error', 'Ocurrió un error al obtener las órdenes de venta pendientes');
        this.loading.set(false);
      }
    });
    

    
    
    


  } 

  /**
   * 
   * export interface OVPendiente {
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

   */

  descargarExcel() {
    const data = this.OVPendientes().map(ov => ({
      'OrderNum': ov.OrderDtl_OrderNum,
      'OrderLine': ov.OrderDtl_OrderLine,
      'PartNum': ov.Part_PartNum,
      'PartDescription': ov.Part_PartDescription,
      'ProdCode': ov.Part_ProdCode,
      'CustNum': ov.OrderDtl_CustNum,
      'CustomerName': ov.Customer_Name,
      'OrderDate': ov.OrderHed_OrderDate,
      'OrderQty': ov.OrderDtl_OrderQty,
      'SalesUM': ov.OrderDtl_SalesUM,
      'NUMCILINDROS': ov.OrderDtl_NUMCILINDROS_c,
      'Capacidad': ov.Calculated_Capacidad,
      'CVEENVASE': ov.OrderDtl_CVEENVASE_c,
      'DescCilindro': ov.Calculated_DescCilindro,
      'LineStatus': ov.OrderDtl_LineStatus,
      'IUM': ov.OrderDtl_IUM,
      'DocTotalCharges': ov.OrderHed_DocTotalCharges,
      'DocTotalTax': ov.OrderHed_DocTotalTax,
      'DocOrderAmt': ov.OrderHed_DocOrderAmt,
      'CVEOPERACION': ov.OrderHed_CVEOPERACION_c,
      'OperacionDesc': ov.Calculated_OperacionDesc,
      'RowIdent': ov.RowIdent
    }));

    this.adminFileService.descargarXLSX(data, 'OVPendientes');
  }

}
