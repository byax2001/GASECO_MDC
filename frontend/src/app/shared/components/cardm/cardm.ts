import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import Modulo from '../../../home/components/interface/Modulo.interface';

@Component({
  selector: 'Cardg',
  imports: [],
  templateUrl: './cardm.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cardm.css',
})
export class Cardg {
  Modulo = input.required<Modulo>();
  ButtonText = input.required<string>();
  Emisor= output<Modulo>();
  

  Execute() {
    this.Emisor.emit(this.Modulo());
  }
}
