import { Component, input } from '@angular/core';
import VentasVendedores from '../../interface/VentasVendedores.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'TableVendedoresRV',
  imports: [DecimalPipe],
  templateUrl: './table-ventas-seller.html',
  styleUrl: './table-ventas-seller.css',
})
export class TableVentasVendedores {
  ventasVendedores = input.required<VentasVendedores[]>();

}
