import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../services/userInfo.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const adminpermisosGuard: CanActivateFn = (route, state) => {
  const userInfoService = inject(UserInfoService);
  const router = inject(Router);
  // Si todavía no se ha cargado la información o si se recarga la página, se espera a que se cargue la información del usuario antes de verificar los permisos
  if (userInfoService.rol()=='') {
    return userInfoService.awaitloadUserInfo().pipe(
      map(() => {
        if (!userInfoService.isAdministrator()) {
          alert(
            'No tiene permisos para acceder a esta sección. Por favor, contacte al administrador del sistema.',
          );

          return router.createUrlTree(['/home']);
        }

        return true;
      }),

      catchError((error) => {
        console.error('Error al cargar la información del usuario:', error);
        alert(
          'Ocurrió un error al verificar los permisos del usuario. Por favor, contacte al administrador del sistema.',
        );
        return of(router.createUrlTree(['/home']));
      }),
    );
  }

  if (!userInfoService.isAdministrator()) {
    alert(
      'No tiene permisos para acceder a esta sección. Por favor, contacte al administrador del sistema.',
    );
    return router.createUrlTree(['/home']);
  }
  return true;
};
