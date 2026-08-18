import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { VentasMoleculas } from '../interfaces/VentasMoleculas.interface';

@Component({
  selector: 'TableMoleculasRV',
  imports: [DecimalPipe],
  templateUrl: './table-ventas-mol.html',
  styleUrl: './table-ventas-mol.css',
})
export class TableVentasMoleculas {
  ventasMoleculas = input.required<VentasMoleculas[]>();
}
