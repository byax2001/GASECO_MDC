import { Component, inject, input } from '@angular/core';
import Cilindro from '../../../../interfaces/cilindro.interface';

@Component({
  selector: 'app-table-cilindros',
  imports: [],
  templateUrl: './table-cilindros.html',
  styleUrl: './table-cilindros.css',
})
export class TableCilindros {
  cilindros = input.required<Cilindro[]>();
  
}
