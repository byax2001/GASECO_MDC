import { Component, input } from '@angular/core';
import { ButtonBack } from "../button-back/button-back";

@Component({
  selector: 'app-header-page',
  imports: [ButtonBack],
  templateUrl: './header-page.html',
  styleUrl: './header-page.css',
})
export class HeaderPage {
  PageName = input.required<string>();
}
