import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


// Este guard permite el acceso a la ruta login si el usuario no esta autenticado,
// es decir, si no hay un token en las cookies, de lo contrario redirige a home y retorna false.q
export const notAuthenticatedGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('token');

  if (!token) {
    return true;
  }

  return router.createUrlTree(['/home']);

};
