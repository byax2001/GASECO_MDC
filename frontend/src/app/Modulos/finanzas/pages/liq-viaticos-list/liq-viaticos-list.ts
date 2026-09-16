import { Component, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { LiqViaTable } from "./components/liq-via-table/liq-via-table";
import { LiqViaticosService } from '../../services/liq-viaticos.service';
import { ErrorApi } from '../../../../interfaces/ErrorApi.interface';
import { Router } from '@angular/router';
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";

@Component({
  selector: 'app-liq-viaticos-list',
  imports: [HeaderPage, Modalg, ButtonIcon, LiqViaTable, SpinnerLoad],
  templateUrl: './liq-viaticos-list.html',
  styleUrl: './liq-viaticos-list.css',
})
export default class LiqViaticosList {
  liqViaticosService = inject(LiqViaticosService);
  @ViewChild('modalG') modalG!: Modalg;
  route = inject(Router);
  loading = signal(false);


  getNuevaLiquidacion(){
    this.loading.set(true);
    this.liqViaticosService.getNewIDLV().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.route.navigate(['/finanzas/lv', res.NewID]);
      },
      error: (err) => {
        const errorApi: ErrorApi = err.error;
        this.modalG.showModalG('Error', `Error ${errorApi.code}: ${errorApi.message}`);
      }
    });
  }
}
