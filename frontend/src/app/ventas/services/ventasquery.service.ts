import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs/internal/Observable';
import { UserInfoService } from '../../services/userInfo.service';

@Injectable({
  providedIn: 'root',
})
export class VentasQueryService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);



  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      `${this.url}/ventas/lclientes/${this.userInfoService.company()}`
    );
  }
}
