import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { InfoUser } from '../interfaces/InfoUser.interface';
import { InfoAppResponse } from '../interfaces/InfoAppResponse.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  http = inject(HttpClient);
  userInfo = signal<InfoUser>({});
  rol = signal<string>('');


  getUserInfo(username: string, token: string): Observable<InfoAppResponse[]> {
  return this.http.get<InfoAppResponse[]>(
    `${environment.API_URL}/user-info/app/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  }

}
