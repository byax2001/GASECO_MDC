import { Component, computed, inject, signal } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { TableClientes } from "./table-clientes/table-clientes";
import { rxResource } from '@angular/core/rxjs-interop';
import { finalize, of } from 'rxjs';
import { Cliente } from '../../interfaces/cliente.interface';
import { SearchDebounce } from "../../components/search-debounce/search-debounce";

import {VentasQueryService } from '../../services/ventasquery.service';
import { UserInfoService } from '../../../services/userInfo.service';
import { SpinnerLoad } from '../../../shared/components/spinner-load/spinner-load';


@Component({
  selector: 'app-lista-clientes',
  imports: [HeaderPage, TableClientes, SearchDebounce, SpinnerLoad],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css',
})
export default class ListaClientes {
  userInfoService = inject(UserInfoService);

  ventasQueryService = inject(VentasQueryService);
  searchText = signal('');
  loading = signal(true);

  clientesResource = rxResource({

    params: () => ({
      company: this.userInfoService.company()
    }),

    stream: ({ params }) => {
      if (!params.company) {
        return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
      }
      this.loading.set(false);
      return this.ventasQueryService.getClientes().pipe(
        finalize(() => this.loading.set(true))
      );
    }

  }); 

  clientesFiltrados = computed(() => {
    const clientes = this.clientesResource.value() ?? [];
    const search = this.searchText().toLowerCase().trim();

    if (!search) {
      return clientes;
    }

    return clientes.filter(c =>
      c.Customer_Name.toLowerCase().includes(search)
    );
  });

  onSearch(cliente: string) {
    this.searchText.set(cliente);
  }

  
}
