import { Component, inject, signal } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { FiltroFechaIF } from "../../../../shared/components/filtro-fecha-if/filtro-fecha-if";
import { RangoFechaIF } from '../../../../shared/components/filtro-fecha-if/interface/RangoFechaIF.interface';
import { ReporteVentasService } from '../../services/reporte-ventas.service';
import VentasVendedores from './interface/VentasVendedores.interface';
import { TableVentas } from "./components/table-ventas/table-ventas";
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";

@Component({
  selector: 'app-vendedores-rv',
  imports: [HeaderPage, FiltroFechaIF, TableVentas, SpinnerLoad],
  templateUrl: './vendedores-rv.html',
  styleUrl: './vendedores-rv.css',
})
export default class VendedoresRV {
loading = signal(false); 
ventasVendedores = signal<VentasVendedores[]>([]);
reporteVentasService = inject(ReporteVentasService);

search(event: RangoFechaIF|null): void {
  if(this.loading()) {
    return;
  }

  this.loading.set(true);
  if(event === null) {
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

}
