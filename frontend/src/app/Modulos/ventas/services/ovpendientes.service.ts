import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { OVPendiente } from '../pages/ovpendientes/interfaces/OVPendiente.interface';
import { UserInfoService } from '../../../services/userInfo.service';

@Service()
export class OVPendientesService {
  userInfoService = inject(UserInfoService);
  http = inject(HttpClient);
  private url =environment.API_URL;

  getOvPendientes(fechaI: string, fechaF: string): Observable<OVPendiente[]> {
    return this.http.get<OVPendiente[]>(`${this.url}/ventas/ovpendientes/${this.userInfoService.company()}/${fechaI}/${fechaF}`);
  }
}
