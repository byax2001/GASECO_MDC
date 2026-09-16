import { Routes } from "@angular/router";
import { FinanzasLayout } from "./layout/finanzas-layout/finanzas-layout";

export const  FinanzasRoute: Routes = [
  {
    path: '',
    component: FinanzasLayout,
    children:[
      {
       path: 'home',
       loadComponent: () => import('./pages/finanzas-home/finanzas-home')
      },

      //LISTADO DE VIATICOS
      {
       path: 'lv',
       loadComponent: () => import('./pages/liq-viaticos-list/liq-viaticos-list')
      },
      //INGRESO DE VIATICOS
      {
        path: 'lv/:id',
        loadComponent: () => import('./pages/liq-viaticos/liq-viaticos')
      },
      {
        path:'**',
        redirectTo: 'home'
      }
    ]

  }
]

export default FinanzasRoute;
