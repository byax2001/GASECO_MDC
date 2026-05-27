import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { ClienteOv } from '../interfaces/ClienteOv.interface';

@Injectable({
  providedIn: 'root',
})
export class VentasQueryService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);



  getClientes(): Observable<Cliente[]> {
    if(this.userInfoService.rol() === 'ADMIN'){
      return this.http.get<Cliente[]>(`${this.url}/ventas/lclientes/${this.userInfoService.company()}`);
    }

    return this.http.get<Cliente[]>(
      `${this.url}/ventas/lclientes/${this.userInfoService.company()}/${this.userInfoService.getCodeUser('VENTAS')}`
    );
  }

  getClienteOv(clienteId: string): Observable<ClienteOv[]> {
    return this.http.get<ClienteOv[]>(
      `${this.url}/ventas/ov/CustInfo/${this.userInfoService.company()}/${clienteId}`
    );
  }

}
