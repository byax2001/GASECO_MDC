import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../interfaces/AuthResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<AuthResponse> {
    console.log('variable de ambiente', environment.API_URL);
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, {'login': username, 'password': password});
  }
}
