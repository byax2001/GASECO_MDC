import { Component, inject, signal } from '@angular/core';
import { TableCilindros } from './components/table-cilindros/table-cilindros';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { SearchDebounce } from "../../components/search-debounce/search-debounce";
import Cilindro from '../../interfaces/cilindro.interface';
import { CilindroCliente } from './components/Interface/CilindroCliente.interface';
import { CilcliService } from '../../services/cilcli.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerLoad } from "../../../shared/components/spinner-load/spinner-load";

@Component({
  selector: 'app-cilindros-cliente',
  imports: [TableCilindros, HeaderPage, SearchDebounce, SpinnerLoad],
  templateUrl: './cilindros-cliente.html',
  styleUrl: './cilindros-cliente.css',
})
export default class CilindrosCliente {
  lcilindros = signal<CilindroCliente[]>([
  ]);
  loading = signal<boolean>(false);
  private route = inject(ActivatedRoute);
  cilindroClienteService = inject(CilcliService);

  onSearchChange(searchValue: string) {
    const filteredCilindros = this.lcilindros().filter((cilindro) =>
      cilindro.SERIE.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.lcilindros.set(filteredCilindros);
  }

  ngOnInit() {
    this.loading.set(true);
    this.route.params.subscribe((params) => {
      const CustID = params['custid'];
      this.cilindroClienteService.getCilCliByCustID(CustID).subscribe((data) => {
        this.lcilindros.set(data);
        this.loading.set(false);
      });
    })
  }
}
