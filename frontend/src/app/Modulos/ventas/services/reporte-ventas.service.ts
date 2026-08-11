import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInfoService } from '../../../services/userInfo.service';
import { RangoFechaIF } from '../../../shared/components/filtro-fecha-if/interface/RangoFechaIF.interface';
import { Observable } from 'rxjs/internal/Observable';
import VentasVendedores from '../pages/vendedores-rv/interface/VentasVendedores.interface';

@Service()
export class ReporteVentasService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);

  getVentasVendedores(RangoFechas: RangoFechaIF): Observable<VentasVendedores[]> {
    return this.http.get<VentasVendedores[]>(
      `${this.url}/ventas/reporte/sellers/${this.userInfoService.company()}/${RangoFechas.FhInicial}/${RangoFechas.FhFinal}`
    );
  }

}
