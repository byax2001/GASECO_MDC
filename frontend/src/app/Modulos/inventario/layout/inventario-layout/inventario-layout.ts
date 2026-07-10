import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarSuc } from "../../../../shared/components/navbarsuc/navbarsuc";
import Link from '../../../../interfaces/Link.interface';
import { ComboDefault } from '../../../../interfaces/ComboDefault.interface';
import Sucursal from '../../../../interfaces/sucursal.interface';

@Component({
  selector: 'app-inventario-layout',
  imports: [RouterOutlet, NavbarSuc],
  templateUrl: './inventario-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './inventario-layout.css',
})
export class InventarioLayout {
  subModulos: Link[] = [
    { descripcion: 'Scanner Cilindros', ruta: '/inventario/scancil' },
  ];
  
  

}
