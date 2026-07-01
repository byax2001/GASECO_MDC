import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import Cilindro from '../../../../interfaces/cilindro.interface';
import { CilindroCliente } from '../Interface/CilindroCliente.interface';
import { TopMenuVentas } from "../../../../components/top-menu/top-menu";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-cilindros',
  imports: [DatePipe],
  templateUrl: './table-cilindros.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './table-cilindros.css',
})
export class TableCilindros {
  cilindros = input.required<CilindroCliente[]>();
  
}
