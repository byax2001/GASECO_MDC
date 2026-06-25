import { Component, input } from '@angular/core';

@Component({
  selector: 'button-icon',
  imports: [],
  templateUrl: './button-icon.html',
  styleUrl: './button-icon.css',
})
export class ButtonIcon {
  funcion = input.required<() => void>();
  tooltip = input.required<string>();
  icon = input.required<string>();

  executeFunction() {
    if (this.funcion) {
      this.funcion()();
    }
  }

}
