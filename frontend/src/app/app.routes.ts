import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './guards/not-authenticated.guard';
import { authenticatedGuard } from './guards/authenticated.guard';
export const routes: Routes = [
  {
  path: '',
  loadComponent: () => import('./shared/login-page/login-page'),
  canActivate:[
    notAuthenticatedGuard
  ]
  },
  {
    path:'home',
    loadComponent: () => import ('./home/home'),
    canMatch:[
      authenticatedGuard
    ]
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.routes'),
    canMatch:[
      authenticatedGuard
    ]
  },
  {
    path:'**',
    redirectTo: ''
  }

];
