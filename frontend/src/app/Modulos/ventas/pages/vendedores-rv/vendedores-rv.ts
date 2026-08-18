import { Component, computed, HostListener, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { FiltroFechaIF } from "../../../../shared/components/filtro-fecha-if/filtro-fecha-if";
import { RangoFechaIF } from '../../../../shared/components/filtro-fecha-if/interface/RangoFechaIF.interface';
import { ReporteVentasService } from '../../services/reporte-ventas.service';
import VentasVendedores from './interface/VentasVendedores.interface';
import { TableVentasVendedores } from "./components/table-ventas/table-ventas-seller";
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { VelocimetroComponent } from "../../../../shared/components/velocimetro/velocimetro";
import { FilesAdmin } from '../../../../services/files-admin.service';
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { tap } from 'rxjs/internal/operators/tap';
import { rxResource } from '@angular/core/rxjs-interop';
import { Moneda } from '../../interfaces/Moneda.interface';
import { UserInfoService } from '../../../../services/userInfo.service';
import { VentasQueryService } from '../../services/ventasquery.service';
import { of } from 'rxjs';
import { CardTable } from "../../../../shared/components/card-table/card-table";

@Component({
  selector: 'app-vendedores-rv',
  imports: [HeaderPage, FiltroFechaIF, TableVentasVendedores, SpinnerLoad, VelocimetroComponent, ButtonIcon, Modalg, CardTable],
  templateUrl: './vendedores-rv.html',
  styleUrl: './vendedores-rv.css',
})
export default class VendedoresRV {
loading = signal(false); 
ventasVendedores = signal<VentasVendedores[]>([]);
reporteVentasService = inject(ReporteVentasService);
userInfoService = inject(UserInfoService);
ventasQueryService = inject(VentasQueryService);
adminFilService = inject(FilesAdmin);
moneda = signal<string>('');

//RATE DE MONEDA
RateMoneda = computed(() => {
  //Busca si hay un Rate si no lo coloca a 0  
  return this.LMonedas.value().
    find(m => m.Currency_CurrencyCode === this.moneda())?.
    Calculated_Rate ?? 0;
});

//REPORTE DE VENTA CON LOS CAMPOS CALCULADOS SEGUN RATE
ventasVendedoresExchange = computed(() => {
  const ventas = this.ventasVendedores();
  const rate = this.RateMoneda();

  if (rate === 0) {
    return ventas;
  }

  return ventas.map(ventav => ({
    ...ventav,
    Calculated_Venta: ventav.Calculated_Venta / rate,
    Calculated_Costo: ventav.Calculated_Costo / rate,
    Calculated_PPTO: ventav.Calculated_PPTO / rate,
    Calculated_GAP: ventav.Calculated_GAP / rate,
    Calculated_MG: ventav.Calculated_MG / rate
  }));
});

//APARTADO PARA VERIFICAR SI EL USUARIO ESTA EN MOVIL O DESKTOP
isMobile = signal(window.innerWidth < 768);
@HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 768);
}

LMonedas = rxResource<Moneda[], { company: string | null; }>({
      defaultValue: [],
      params: () => ({  
        company: this.userInfoService.company(),
      }),
      stream: ({ params }) => {
        if (!params.company ) {
              return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
        }       
    
      return this.ventasQueryService.getMonedas().pipe(
      tap(monedas => {
        if (monedas.length > 0) {
          this.moneda.set(monedas[0].Currency_CurrencyCode);
        }
      })
    );
    }
  })

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

cambioMoneda(event: Event) {
  const select = event.target as HTMLSelectElement;
  const moneda = select.value;
  this.moneda.set(moneda);

}

}
