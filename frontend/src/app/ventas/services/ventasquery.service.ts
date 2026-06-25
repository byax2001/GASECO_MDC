import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { ClienteInfoOv} from '../pages/orden-venta/components/interface/ClienteInfoOv.interface';
import { PartUOM } from '../interfaces/PartUOM.interface';
import { Moneda } from '../interfaces/Moneda.interface';
import { TCilindros } from '../interfaces/TCilindros.interface';
import { PartOV } from '../pages/orden-venta/components/interface/PartOV.interface';
import { PrecioUnitario } from '../interfaces/PrecioUnitario.interface';
import { CrearOvResponse } from '../pages/orden-venta/components/interface/CrearOvResponse.interface';
import { CrearOvRequest } from '../pages/orden-venta/components/interface/CrearOvRequest.interface';
import { AddLineOvRequest } from '../pages/orden-venta/components/interface/AddLineOvRequest.interface';
import { AddLineOvResponse } from '../pages/orden-venta/components/interface/AddLineOvResponse.interface';

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
  getMonedas(CustID: string): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.url}/ventas/lmonedas/${this.userInfoService.company()}/${CustID}`);
  }

  //PARA OBTENER LOS TIPOS DE CILINDROS PERMITIDOS PARA ORDENES DE VENTAS
  getTipoCilindros(): Observable<TCilindros[]> {
    return this.http.get<TCilindros[]>(`${this.url}/ventas/ltcilindros/${this.userInfoService.company()}`);
  }

  //PARA OBTENER EL PRECIO UNITARIO DE UNA PARTE EN ORDENES DE VENTA TOMANDO EN CUENTA
  //EL UOM, CLIENT EY MONEDA SELECCIONADOS
  getPrecioUnitario(PartNum: string, UOM: string, CustID: string, CurrencyCode: string): Observable<PrecioUnitario[]> {
    return this.http.get<PrecioUnitario[]>(
      //http://localhost:8087/ventas/lprecio/165943/ACE-15-CI/FT3/2010/GTQ
      `${this.url}/ventas/lprecio/${this.userInfoService.company()}/${PartNum}/${UOM}/${CustID}/${CurrencyCode}`
    );
  }

  //Crear orden de venta:
  postCrearOV(data: CrearOvRequest): Observable<CrearOvResponse> {
    return this.http.post<CrearOvResponse>(
      `${this.url}/ventas/ov/CrearOV/${this.userInfoService.company()}`,
      //se envia la data en el body de la solicitud POST
      data
    );
  }

  //Agregar lineas a orden de venta existente:
  postAddLineas(data: AddLineOvRequest[]): Observable<AddLineOvResponse> {
    return this.http.post<AddLineOvResponse>(
      `${this.url}/ventas/ov/AddLineas/${this.userInfoService.company()}`,
      data
    );
  }
  

}
