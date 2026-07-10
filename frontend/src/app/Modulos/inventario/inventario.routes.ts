import { Routes } from "@angular/router";
import { InventarioLayout } from "./layout/inventario-layout/inventario-layout";
export const  HandheldOP: Routes = [
  {
    path: '',
    component: InventarioLayout,
    children:[
      {
       path: 'scancil',
       loadComponent: () => import('./pages/scanner-cil/scanner-cil')
      },
      {
        path:'**',
        redirectTo: 'scancil'
      }
    ]

  }
]

export default HandheldOP;
