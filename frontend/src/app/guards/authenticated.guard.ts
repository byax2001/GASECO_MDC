import { inject } from '@angular/core';
import { CanMatchFn, Route, Router,  UrlSegment } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


// Este guard se encarga de verificar si el usuario esta autenticado en base a la existencia de un
// token en las cookies, si el token no existe o es vacio, redirige al login y retorna false, 
// de lo contrario retorna true y permite el acceso a la ruta protegida. 
// Este guard se utiliza para proteger las rutas de autenticacion

export const authenticatedGuard: CanMatchFn = (
  route:Route, 
  segments: UrlSegment[]) => {
    const cookieService = inject(CookieService);
    const router = inject(Router);
    const token = cookieService.get('token');

    //Si no hay token redirige a login
    if (token === null || token === '') {
       return router.createUrlTree(['/']);
    }

  return true;
};
