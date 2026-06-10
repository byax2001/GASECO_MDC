import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../../services/userInfo.service';
import { Observable } from 'rxjs';
import { VentasPresupuestoResponse } from '../pages/presupuestos/interface/VentasPresupuestoResponse.interface';
import { Vendedores } from '../interfaces/Vendedores.interface';

@Injectable({
  providedIn: 'root',
})

export class PresupuestoqueryServiceTs {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);


  // Retorna las ventas para presupuestos
  getVentasPresupuesto(Anio:number, CodVendedor:number): Observable<VentasPresupuestoResponse[]> {
    return this.http.get<VentasPresupuestoResponse[]>(
      `${this.url}/ventas/ppto/${this.userInfoService.company()}/${Anio}/${CodVendedor}`
    );
  }

  getVendedores():Observable<Vendedores[]> {
    return this.http.get<Vendedores[]>(`${this.url}/ventas/ppto/vendedores/${this.userInfoService.company()}`);
  }
}
