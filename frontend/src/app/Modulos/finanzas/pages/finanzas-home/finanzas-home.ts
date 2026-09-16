import { Component } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { Modalg } from "../../../../shared/components/modalg/modalg";

@Component({
  selector: 'app-finanzas-home',
  imports: [HeaderPage, Modalg],
  templateUrl: './finanzas-home.html',
  styleUrl: './finanzas-home.css',
})
export default class FinanzasHome {

}
