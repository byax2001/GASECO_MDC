import { Routes } from "@angular/router";
import { VentasLayout } from "./layouts/ventas-layout/ventas-layout";
import { adminpermisosGuard } from "../../guards/adminpermisos.guard";

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
        path: 'cilcli/:custid',
        loadComponent: () => import('./pages/cilindros-cliente/cilindros-cliente')
      },
      {
        path: 'ov/:custid',
        loadComponent: () => import('./pages/orden-venta/orden-venta')
      },
      {
        path: 'presupuestos',
        loadComponent: () => import('./pages/presupuestos/presupuestos')
      },
      {
        path: 'ovpendientes',
        loadComponent: () => import('./pages/ovpendientes/ovpendientes')
      },
      {
        path:'vendedores-rv',
        loadComponent: () => import('./pages/vendedores-rv/vendedores-rv'),
        canActivate: [adminpermisosGuard]
      },
      {
        path:'moleculas-rv',
        loadComponent: () => import('./pages/moleculas-rv/moleculas-rv'),
        canActivate: [adminpermisosGuard]
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
