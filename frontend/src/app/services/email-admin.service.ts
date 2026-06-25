import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Correo } from '../interfaces/Correo.interface';
import { CorreoResponse } from '../interfaces/CorreoResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailAdminService {
  private http = inject(HttpClient);

  sendEmail(correo: Correo):Observable<CorreoResponse> {
    return this.http.post<CorreoResponse>(`${environment.API_URL}/correo/enviar`, correo);
  }
}
