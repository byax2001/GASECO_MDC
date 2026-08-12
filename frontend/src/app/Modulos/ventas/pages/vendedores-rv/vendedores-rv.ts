import { Component, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { FiltroFechaIF } from "../../../../shared/components/filtro-fecha-if/filtro-fecha-if";
import { RangoFechaIF } from '../../../../shared/components/filtro-fecha-if/interface/RangoFechaIF.interface';
import { ReporteVentasService } from '../../services/reporte-ventas.service';
import VentasVendedores from './interface/VentasVendedores.interface';
import { TableVentas } from "./components/table-ventas/table-ventas";
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { VelocimetroComponent } from "../../../../shared/components/velocimetro/velocimetro";
import { FilesAdmin } from '../../../../services/files-admin.service';
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { Modalg } from "../../../../shared/components/modalg/modalg";

@Component({
  selector: 'app-vendedores-rv',
  imports: [HeaderPage, FiltroFechaIF, TableVentas, SpinnerLoad, VelocimetroComponent, ButtonIcon, Modalg],
  templateUrl: './vendedores-rv.html',
  styleUrl: './vendedores-rv.css',
})
export default class VendedoresRV {
loading = signal(false); 
ventasVendedores = signal<VentasVendedores[]>([]);
reporteVentasService = inject(ReporteVentasService);
adminFilService = inject(FilesAdmin);
@ViewChild ('modalG') modalG!: Modalg;

search(event: RangoFechaIF|null): void {
  if(this.loading()) {
    return;
  }

  this.loading.set(true);
  if(event === null) {
    this.loading.set(false);
    return;
  }

  this.reporteVentasService.getVentasVendedores(event).subscribe({
    next: (data) => {
      this.ventasVendedores.set(data);
      this.loading.set(false);
    },
    error: (error) => {
      console.error('Error al obtener los datos de ventas por vendedores:', error);
      this.loading.set(false);
    }
  });
}

descargarExcel(): void {
  if(this.ventasVendedores().length === 0) {
    this.modalG.showModalG('Error', 'No hay datos para descargar. Por favor, realice una búsqueda primero.');
    return;
  }


  /**export default interface VentasVendedores {
    Calculated_SellerName: string;
    Calculated_IDVendedor: string;
    Calculated_Venta:      number;
    Calculated_Costo:      number;
    Calculated_Peso:       number;
    Calculated_PPTO:       number;
    Calculated_Ejecutado:  number;
    Calculated_Pendiente:  number;
    Calculated_GAP:        number;
    Calculated_MG:         number;
    Calculated_MGp:        number;
    RowIdent:              string;
} */
  const data = this.ventasVendedores().map(vendedor => ({
    'SellerName': vendedor.Calculated_SellerName,
    'IDVendedor': vendedor.Calculated_IDVendedor,
    'Venta': vendedor.Calculated_Venta,
    'Costo': vendedor.Calculated_Costo,
    'Peso': vendedor.Calculated_Peso,
    'PPTO': vendedor.Calculated_PPTO,
    'Ejecutado': vendedor.Calculated_Ejecutado,
    'Pendiente': vendedor.Calculated_Pendiente,
    'GAP': vendedor.Calculated_GAP,
    'MG': vendedor.Calculated_MG,
    'MGp': vendedor.Calculated_MGp
  }));

  this.adminFilService.descargarXLSX(data, 'Ventas_Vendedores');
}

}
