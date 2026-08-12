import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { VentasMoleculas } from '../interfaces/VentasMoleculas.interface';

@Component({
  selector: 'TableMoleculasRV',
  imports: [DecimalPipe],
  templateUrl: './table-ventas.html',
  styleUrl: './table-ventas.css',
})
export class TableVentas {
  ventasMoleculas = input.required<VentasMoleculas[]>();
}
