import { inject, Injectable } from '@angular/core';
import { UserInfoService } from '../../../services/userInfo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CilindroCliente } from '../pages/cilindros-cliente/components/Interface/CilindroCliente.interface';

@Injectable({
  providedIn: 'root',
})
export class CilcliService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);


  getCilCliByCustID(CustID: string): Observable<CilindroCliente[]> {
    const url = `${this.url}/ventas/cilcli/${CustID}`;
    return this.http.get<CilindroCliente[]>(url);
  }
}

