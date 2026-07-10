import { inject, Service } from '@angular/core';
import { UserInfoService } from '../../../../../services/userInfo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CilindroScan } from '../../../components/CilindroScan.interface';

@Service()
export class EscaneoService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);

    //SE BUSCA EL CILINDRO EN BASE A SU SERIE
 buscarCilindro(cilindro:string): Observable<CilindroScan[]>{
    const url = `${this.url}/inv/scancil/byserie/${cilindro}`;
    return this.http.get<CilindroScan[]>(url);
  }

}
