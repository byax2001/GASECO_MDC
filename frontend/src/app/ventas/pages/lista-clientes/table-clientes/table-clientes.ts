import { Component, input } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-table-clientes',
  imports: [],
  templateUrl: './table-clientes.html',
  styleUrl: './table-clientes.css',
})
export class TableClientes {
  lclientes = input.required<Cliente[]>();
}
