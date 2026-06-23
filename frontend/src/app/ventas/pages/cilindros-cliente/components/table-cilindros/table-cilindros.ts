import { Component, inject, input } from '@angular/core';
import Cilindro from '../../../../interfaces/cilindro.interface';
import { CilindroCliente } from '../Interface/CilindroCliente.interface';
import { TopMenuVentas } from "../../../../components/top-menu/top-menu";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-cilindros',
  imports: [TopMenuVentas, DatePipe],
  templateUrl: './table-cilindros.html',
  styleUrl: './table-cilindros.css',
})
export class TableCilindros {
  cilindros = input.required<CilindroCliente[]>();
  
}
