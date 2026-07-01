import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonBack } from "../button-back/button-back";

@Component({
  selector: 'app-header-page',
  imports: [ButtonBack],
  templateUrl: './header-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header-page.css',
})
export class HeaderPage {
  PageName = input.required<string>();
}
