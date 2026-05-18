import { Component, inject, signal } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { TableClientes } from "./table-clientes/table-clientes";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Cliente } from '../../interfaces/cliente.interface';
import { SearchDebounce } from "../../components/search-debounce/search-debounce";
import { CompanyService } from '../../services/company.service';
import {VentasQueryService } from '../../services/ventasquery.service';

@Component({
  selector: 'app-lista-clientes',
  imports: [HeaderPage, TableClientes, SearchDebounce],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css',
})
export default class ListaClientes {

  companyService = inject(CompanyService);
  ventasQueryService = inject(VentasQueryService);

  clientesResource = rxResource({

    params: () => ({
      company: this.companyService.selectedCompany()
    }),

    stream: ({ params }) => {
      if (!params.company) {
        return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
      }
      return this.ventasQueryService.getClientes();
    }

  }); 

  clientesFiltrados = signal<Cliente[]>([]);

  constructor() {
    //Se copia de esta forma para evitar crear referencias con el array original, 
    // lo que permite mantener el estado original para futuras búsquedas
    // Si se hiciera solo = clientesResource, se estaría creando una referencia al mismo array, 
    // y cualquier cambio en clientesFiltrados afectaría a clientesResource
    this.clientesFiltrados.set([...this.clientesResource()]);
  }

  onSearch(cliente:string){
    this.clientesFiltrados.set(this.clientesResource().filter( c => c.Customer_Name.toLowerCase().includes(cliente.toLowerCase())));
  }

  
}
