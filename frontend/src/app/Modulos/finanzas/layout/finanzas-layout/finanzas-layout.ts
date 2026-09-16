import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../../../shared/components/navbar/navbar";
import Link from '../../../../interfaces/Link.interface';

@Component({
  selector: 'app-finanzas-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './finanzas-layout.html',
  styleUrl: './finanzas-layout.css',
})
export class FinanzasLayout {
  subModulos: Link[] = [
    { descripcion: 'Liquidación de Viaticos', ruta: '/finanzas/lv' },
  ];
}
