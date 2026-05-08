import { Component, signal } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { TableClientes } from "./table-clientes/table-clientes";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Cliente } from '../../interfaces/cliente.interface';
import { SearchDebounce } from "../../components/search-debounce/search-debounce";

@Component({
  selector: 'app-lista-clientes',
  imports: [HeaderPage, TableClientes, SearchDebounce],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css',
})
export default class ListaClientes {

  clientesResource = signal<Cliente[]>([
    { id: 1, name: 'Aceros de Guatemala S.A.', code: '4102', type: 'A', status: 'Activo' },
    { id: 2, name: 'Industrias Tecnologícas Corporativas', code: '1350', type: 'B', status: 'Inactivo' },
    { id: 3, name: 'Farmaceutica centroamericana', code: '1000', type: 'C', status: 'Activo' },
    { id: 4, name: 'Gustavo Perez', code: '5231', type: 'A', status: 'Activo' },
    { id: 5, name: 'Martina Trujillo Sanchez', code: '2256', type: 'B', status: 'Inactivo' },
    { id: 6, name: 'Inversiones del Norte', code: '7890', type: 'C', status: 'Activo' },
    { id: 7, name: 'Comercializadora del Sur', code: '4567', type: 'A', status: 'Activo' },
    { id: 8, name: 'Servicios Financieros Globales', code: '3210', type: 'B', status: 'Inactivo' },
    { id: 9, name: 'Constructora del Valle', code: '6543', type: 'C', status: 'Activo' },
    { id: 10, name: 'Distribuidora de Alimentos', code: '9876', type: 'A', status: 'Activo' },
  ])

  clientesFiltrados = signal<Cliente[]>([]);

  constructor() {
    //Se copia de esta forma para evitar crear referencias con el array original, 
    // lo que permite mantener el estado original para futuras búsquedas
    // Si se hiciera solo = clientesResource, se estaría creando una referencia al mismo array, 
    // y cualquier cambio en clientesFiltrados afectaría a clientesResource
    this.clientesFiltrados.set([...this.clientesResource()]);
  }

  onSearch(cliente:string){
    this.clientesFiltrados.set(this.clientesResource().filter( c => c.name.toLowerCase().includes(cliente.toLowerCase())));
  }
}
