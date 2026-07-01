import { Routes } from "@angular/router";
import { HandlhedopLayout } from "./layout/handlhedop-layout/handlhedop-layout";
export const  HandheldOP: Routes = [
  {
    path: '',
    component: HandlhedopLayout,
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
