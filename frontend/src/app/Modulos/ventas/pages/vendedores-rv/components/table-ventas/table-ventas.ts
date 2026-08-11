import { Component, input } from '@angular/core';
import VentasVendedores from '../../interface/VentasVendedores.interface';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'TableVendedoresRV',
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './table-ventas.html',
  styleUrl: './table-ventas.css',
})
export class TableVentas {
  ventasVendedores = input.required<VentasVendedores[]>();

}
