import { Component, computed, HostListener, inject, input, signal, ViewChild } from '@angular/core';
import { VentasMoleculas } from './interfaces/VentasMoleculas.interface';
import { ReporteVentasService } from '../../services/reporte-ventas.service';
import { FilesAdmin } from '../../../../services/files-admin.service';
import { Modalg } from '../../../../shared/components/modalg/modalg';
import { RangoFechaIF } from '../../../../shared/components/filtro-fecha-if/interface/RangoFechaIF.interface';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { FiltroFechaIF } from "../../../../shared/components/filtro-fecha-if/filtro-fecha-if";
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { TableVentasMoleculas } from "./table-ventas/table-ventas-mol";
import { VelocimetroComponent } from "../../../../shared/components/velocimetro/velocimetro";
import { Moneda } from '../../interfaces/Moneda.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, tap } from 'rxjs';
import { UserInfoService } from '../../../../services/userInfo.service';
import { VentasQueryService } from '../../services/ventasquery.service';
import { CardTable } from "../../../../shared/components/card-table/card-table";

@Component({
  selector: 'app-moleculas-rv',
  imports: [Modalg, HeaderPage, FiltroFechaIF, ButtonIcon, SpinnerLoad, TableVentasMoleculas, VelocimetroComponent, CardTable],
  templateUrl: './moleculas-rv.html',
  styleUrl: './moleculas-rv.css',
})
export default class MoleculasRV {
loading = signal(false); 
ventasMoleculas = signal<VentasMoleculas[]>([]);
reporteVentasService = inject(ReporteVentasService);
adminFilService = inject(FilesAdmin);
userInfoService = inject(UserInfoService);
ventasQueryService = inject(VentasQueryService);
moneda = signal<string>('');

//RATE DE MONEDA
RateMoneda = computed(() => {
  //Busca si hay un Rate si no lo coloca a 0  
  return this.LMonedas.value().
    find(m => m.Currency_CurrencyCode === this.moneda())?.
    Calculated_Rate ?? 0;
});

//REPORTE DE VENTA CON LOS CAMPOS CALCULADOS SEGUN RATE
ventasMoleculasExchange = computed(() => {
  const ventas = this.ventasMoleculas();
  const rate = this.RateMoneda();

  if (rate === 0) {
    return ventas;
  }

  return ventas.map(ventam => ({
    ...ventam,
    Calculated_Venta: ventam.Calculated_Venta / rate,
    Calculated_Costo: ventam.Calculated_Costo / rate,
    Calculated_PPTO: ventam.Calculated_PPTO / rate,
    Calculated_GAP: ventam.Calculated_GAP / rate,
    Calculated_MG: ventam.Calculated_MG / rate
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

cambioMoneda(event: Event) {
  const select = event.target as HTMLSelectElement;
  const moneda = select.value;
  this.moneda.set(moneda);

}
}
