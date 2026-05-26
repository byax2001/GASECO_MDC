import { Routes } from "@angular/router";
import { VentasLayout } from "./layouts/ventas-layout/ventas-layout";

export const ventasRoutes: Routes = [
  {
    path: '',
    component: VentasLayout,
    children:[
      {
       path: 'lclientes',
       loadComponent: () => import('./pages/lista-clientes/lista-clientes')
      },
      {
        path: 'cilcli',
        loadComponent: () => import('./pages/cilindros-cliente/cilindros-cliente')
      },
      {
        path: 'ov/:custid',
        loadComponent: () => import('./pages/orden-venta/orden-venta')
      }


      ,
      {
        path:'**',
        redirectTo: 'lclientes'
      }
    ]

  }
]

export default ventasRoutes;
