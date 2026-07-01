import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { TableClientes } from "./table-clientes/table-clientes";
import { rxResource } from '@angular/core/rxjs-interop';
import { finalize, of } from 'rxjs';
import { Cliente } from '../../interfaces/cliente.interface';
import { SearchDebounce } from "../../components/search-debounce/search-debounce";

import {VentasQueryService } from '../../services/ventasquery.service';
import { UserInfoService } from '../../../../services/userInfo.service';
import { SpinnerLoad } from '../../../../shared/components/spinner-load/spinner-load';
import { FilesAdmin } from '../../../../services/files-admin.service';
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";


@Component({
  selector: 'app-lista-clientes',
  imports: [HeaderPage, TableClientes, SearchDebounce, SpinnerLoad, ButtonIcon],
  templateUrl: './lista-clientes.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './lista-clientes.css',
})
export default class ListaClientes {
  userInfoService = inject(UserInfoService);
  ventasQueryService = inject(VentasQueryService);
  adminFileService = inject(FilesAdmin);
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

  descargarExcel() {
    const clientes = this.clientesResource.value() ?? [];
    if (clientes.length === 0) {
      alert('No hay clientes para descargar.');
      return;
    }


    const data = clientes.map(c => ({
      'Company': c.Customer_Company,
      'CustID': c.Customer_CustID,
      'CustName': c.Customer_Name,
      'TipoCustomer_c': c.Customer_TipoCustomer_c,
      'TerritoryID': c.Customer_TerritoryID,
      'TermsCode': c.Customer_TermsCode,
      'CurrencyCode': c.Customer_CurrencyCode,
      'MontoProspecto_c': c.Customer_MontoProspecto_c,
      'Agrupacion_c': c.Customer_Agrupacion_c,
      'FechaCreacion_c': c.Customer_FechaCreacion_c,
      'Estado': c.Calculated_Estado,
    }));
    this.adminFileService.descargarXLSX(data, 'Clientes');

  }

  
}
