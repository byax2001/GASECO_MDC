import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInfoService } from '../../../services/userInfo.service';
import { Observable } from 'rxjs';
import { VentasPresupuestoResponse } from '../pages/presupuestos/interface/VentasPresupuestoResponse.interface';
import { Vendedores } from '../interfaces/Vendedores.interface';
import UploadpptoResponse from '../pages/presupuestos/interface/UploadpptoResponse.interface';
import UploadpptoRequest from '../pages/presupuestos/interface/UploadpptoRequest.interface';

@Injectable({
  providedIn: 'root',
})

export class PresupuestoqueryServiceTs {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);


  // Retorna las ventas para presupuestos
  getVentasPresupuesto(Anio:number, PresupuestoPor:string, CodVendedor:string): Observable<VentasPresupuestoResponse[]> {
    return this.http.get<VentasPresupuestoResponse[]>(
      `${this.url}/ventas/ppto/${this.userInfoService.company()}/${Anio}/${PresupuestoPor}/${CodVendedor}`
    );
  }

  getVendedores():Observable<Vendedores[]> {
    if(this.userInfoService.rol()!='ADMIN'){
      const codVendedor = this.userInfoService.getCodeUser('VENTAS');
      return this.http.get<Vendedores[]>(`${this.url}/ventas/ppto/vendedores/${this.userInfoService.company()}/${codVendedor}`);
    }
    return this.http.get<Vendedores[]>(`${this.url}/ventas/ppto/vendedores/${this.userInfoService.company()}/ADMIN`);
  }

  uploadPresupuesto(data: UploadpptoRequest): Observable<UploadpptoResponse> {
    return this.http.post<UploadpptoResponse>(`${this.url}/ventas/ppto/upload/${this.userInfoService.company()}`, data);
  }
}
