import { Component } from '@angular/core';
import { TopMenu } from "../../components/top-menu/top-menu";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-ventas-layout',
  imports: [TopMenu, RouterOutlet],
  templateUrl: './ventas-layout.html',
  styleUrl: './ventas-layout.css',
})
export class VentasLayout {

}
