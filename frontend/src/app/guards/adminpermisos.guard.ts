import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../services/userInfo.service';
import { inject } from '@angular/core';

export const adminpermisosGuard: CanActivateFn = (route, state) => {
  const userInfoService = inject(UserInfoService);
  const router = inject(Router);
  
  if(!userInfoService.isAdministrator()){
    alert('No tiene permisos para acceder a esta sección. Por favor, contacte al administrador del sistema.');
    return router.createUrlTree(['/home']);
  }
  return true;
};
