import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { ClienteInfoOv} from '../interfaces/ClienteInfoOv.interface';
import { PartUOM } from '../interfaces/PartUOM.interface';
import { Moneda } from '../interfaces/Moneda.interface';
import { TCilindros } from '../interfaces/TCilindros.interface';
import { PartOV } from '../interfaces/PartOV.interface';

@Injectable({
  providedIn: 'root',
})
export class VentasQueryService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);


  //PARA OBTENER LA LISTA DE CLIENTES PARA ORDENES DE VENTA
  getClientes(): Observable<Cliente[]> {
    if(this.userInfoService.rol() === 'ADMIN'){
      return this.http.get<Cliente[]>(`${this.url}/ventas/lclientes/${this.userInfoService.company()}`);
    }

    return this.http.get<Cliente[]>(
      `${this.url}/ventas/lclientes/${this.userInfoService.company()}/${this.userInfoService.getCodeUser('VENTAS')}`
    );
  }

  //PARA OBTENER INFORMACION DE UN CLIENTE EN ORDENES DE VENTA
  getClienteInfoOv(clienteId: string): Observable<ClienteInfoOv[]> {
    return this.http.get<ClienteInfoOv[]>(
      `${this.url}/ventas/ov/CustInfo/${this.userInfoService.company()}/${clienteId}`
    );
  }

  //PARA OBTENER TODAS LAS PARTES PERMITIDAS PARA ORDENES DE VENTAS
  getPartOv(): Observable<PartOV[]> {
    return this.http.get<PartOV[]>(
      `${this.url}/ventas/lpartes/${this.userInfoService.company()}`
    );
  }

  //PARA OBTENER LAS UNIDADES DE MEDIDA PERMITIDAS PARA UNA PARTE EN ORDENES DE VENTA
  getPartUOM(PartNum: string): Observable<PartUOM[]> {
    return this.http.get<PartUOM[]>(
      `${this.url}/ventas/luom/${this.userInfoService.company()}/${PartNum}`
    );
  }

  //PARA OBTENER TODAS LAS MONEDAS PERMITIDAS PARA ORDENES DE VENTAS
  getMonedas(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.url}/ventas/lmonedas/${this.userInfoService.company()}`);
  }

  //PARA OBTENER LOS TIPOS DE CILINDROS PERMITIDOS PARA ORDENES DE VENTAS
  getTipoCilindros(): Observable<TCilindros[]> {
    return this.http.get<TCilindros[]>(`${this.url}/ventas/ltcilindros/${this.userInfoService.company()}`);
  }
}
