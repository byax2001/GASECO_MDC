import { Component, inject, signal, ViewChild } from '@angular/core';
import { VentasMoleculas } from './interfaces/VentasMoleculas.interface';
import { ReporteVentasService } from '../../services/reporte-ventas.service';
import { FilesAdmin } from '../../../../services/files-admin.service';
import { Modalg } from '../../../../shared/components/modalg/modalg';
import { RangoFechaIF } from '../../../../shared/components/filtro-fecha-if/interface/RangoFechaIF.interface';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { FiltroFechaIF } from "../../../../shared/components/filtro-fecha-if/filtro-fecha-if";
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { TableVentas } from "./table-ventas/table-ventas";
import { VelocimetroComponent } from "../../../../shared/components/velocimetro/velocimetro";

@Component({
  selector: 'app-moleculas-rv',
  imports: [Modalg, HeaderPage, FiltroFechaIF, ButtonIcon, SpinnerLoad, TableVentas, VelocimetroComponent],
  templateUrl: './moleculas-rv.html',
  styleUrl: './moleculas-rv.css',
})
export default class MoleculasRV {
loading = signal(false); 
ventasMoleculas = signal<VentasMoleculas[]>([]);
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

  this.reporteVentasService.getVentasMoleculas(event).subscribe({
    next: (data) => {
      this.ventasMoleculas.set(data);
      this.loading.set(false);
    },
    error: (error) => {
      console.error('Error al obtener los datos de ventas por vendedores:', error);
      this.loading.set(false);
    }
  });
}

descargarExcel(): void {
  if(this.ventasMoleculas().length === 0) {
    this.modalG.showModalG('Error', 'No hay datos para descargar. Por favor, realice una búsqueda primero.');
    return;
  }


  /**export default interface VentasVendedores {
   export interface VentasMoleculas {
    UDCodes_CodeID:       string;
    UDCodes_CodeDesc:     string;
    Calculated_Venta:     number;
    Calculated_Costo:     number;
    Calculated_Peso:      number;
    Calculated_PPTO:      number;
    Calculated_Ejecutado: number;
    Calculated_Pendiente: number;
    Calculated_GAP:       number;
    Calculated_MG:        number;
    Calculated_MGp:       number;
    RowIdent:             string;
} */
  const data = this.ventasMoleculas().map(molecula => ({
    'CodeID': molecula.UDCodes_CodeID,
    'CodeDesc': molecula.UDCodes_CodeDesc,
    'Venta': molecula.Calculated_Venta,
    'Costo': molecula.Calculated_Costo,
    'Peso': molecula.Calculated_Peso,
    'PPTO': molecula.Calculated_PPTO,
    'Ejecutado': molecula.Calculated_Ejecutado,
    'Pendiente': molecula.Calculated_Pendiente,
    'GAP': molecula.Calculated_GAP,
    'MG': molecula.Calculated_MG,
    'MGp': molecula.Calculated_MGp
  }));

  this.adminFilService.descargarXLSX(data, 'Ventas_Vendedores');
}
}
