import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TopMenuVentas } from "../../components/top-menu/top-menu";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-ventas-layout',
  imports: [TopMenuVentas, RouterOutlet],
  templateUrl: './ventas-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './ventas-layout.css',
})
export class VentasLayout {

}
