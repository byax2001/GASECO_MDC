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
      {
       path: 'lv',
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
