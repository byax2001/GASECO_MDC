import { Component, input, output } from '@angular/core';
import { CilindroScan } from '../../../../components/CilindroScan.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tabla-cilindros-esc',
  imports: [DatePipe],
  templateUrl: './tabla-cilindros-esc.html',
  styleUrl: './tabla-cilindros-esc.css',
})

export class TablaCilindrosEsc {
lcilindros = input.required<CilindroScan[]>();
deleteLine = output<number>();

funcDel(index: number) {
  this.deleteLine.emit(index);
}

}
