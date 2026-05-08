import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: '',
  loadComponent: () => import('./shared/login-page/login-page')
  },
  {
    path:'home',
    loadComponent: () => import ('./home/home')
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.routes')
  },
  {
    path:'**',
    redirectTo: ''
  }

];
