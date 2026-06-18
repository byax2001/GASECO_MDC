import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { InfoUser } from '../interfaces/InfoUser.interface';
import { InfoAppResponse } from '../interfaces/InfoAppResponse.interface';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import mapToInfoUser from '../Mapper/InfoUser.mapper';
import { CookieService } from 'ngx-cookie-service';
import { UserName } from '../interfaces/UserName.interface';
import { Company } from '../interfaces/Company.interface';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  userInfo = signal<InfoUser>({});
  rol = signal<string>('');
  company = signal<string>('');

  companyNames: Record<string, string> = {
    '165943': 'GASECO GT',
    '165943B': 'GASECO HN'
  };
  
  //Modulos:
  // VENTAS: Modulo de ventas.
  // MDC: Modulo de Cilindros.
  // Ejemplo de estructura de userInfo:
  /*
  {
    "165943": {
      "VENTAS": "codigo_usuario_ventas",
      "MDC": "codigo_usuario_mdc"
    },
    "165943B": {
      "VENTAS": "codigo_usuario_ventas_hn",
      "MDC": "codigo_usuario_mdc_hn"
    }
  }
  */

  getUserInfo(username: string): Observable<InfoAppResponse[]> {
    //Ya no es necesario el token porque el interceptor se encarga de agregarlo a cada petición
  return this.http.get<InfoAppResponse[]>(
    `${environment.API_URL}/user-info/${username}`);
  }

  getUserName(): Observable<UserName> {
    return this.http.get<UserName>(`${environment.API_URL}/user-info/username`);
  }

  loadUserInfo() {
    
    this.getUserName().subscribe({
      next: (resp_user) => {
        this.getUserInfo(resp_user.username).subscribe({
          next: (response) => {
            this.userInfo.set(mapToInfoUser(response));
            this.company.set(this.getCompaniesCmb()[0]?.code ?? '');
            this.rol.set(resp_user.rol);
            console.log('User info cargada:', this.userInfo())
          },
          error: (error) => {
            console.error('Error cargando user info', error);
          }
      });
      },
      error: (error) => {
        console.error('Error cargando username', error);
      }
    });
    

  }

  awaitloadUserInfo() {
    return this.getUserName().pipe(
        switchMap(resp_user =>
          this.getUserInfo(resp_user.username).pipe(
            tap(response => {
              this.userInfo.set(mapToInfoUser(response));
              this.company.set(this.getCompaniesCmb()[0]?.code ?? '');
              this.rol.set(resp_user.rol);
            })
          )
        )
      );
  }

  getCompaniesCmb():Company[]{
     return Object.keys(this.userInfo()).map(company => ({
      code: company,
      name: this.companyNames[company] ?? company
    }));
  }

  getCodeUser(modulo:string): string {
    const codUser = this.userInfo()[this.company()]?.[modulo];
    return codUser || '';
  }

  verifyAccess(modulo: string): boolean {
    // El !! simplemente convierte el resultado a un booleano, devolviendo true si el código de usuario 
    // existe para el módulo dado, o false si no existe.
    return !!this.getCodeUser(modulo);
  }

}
