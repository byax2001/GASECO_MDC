import { Component, computed, effect, HostListener, inject, input, signal } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente.interface';
import { PaginationTable } from "../../../../shared/components/pagination-table/pagination-table";
import { Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-table-clientes',
  imports: [PaginationTable, RouterLink],
  templateUrl: './table-clientes.html',
  styleUrl: './table-clientes.css',
})
export class TableClientes {
  router = inject(Router);
  //APARTADO PARA VERIFICAR SI EL USUARIO ESTA EN MOVIL O DESKTOP
  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 768);
  }

  lclientes = input.required<Cliente[]>();
  isMobile = signal(window.innerWidth < 768);
  currentPage = signal(1);
  pageSize = 100;

  paginatedClientes = computed(() => {
    const clientes = this.lclientes();
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return clientes.slice(start, end);
  });

  constructor() {
    effect(() => {
      const total = this.lclientes().length;
      this.currentPage.set(1);
    });
  }
   createOV(custId: string) {
    console.log('Crear OV para cliente:', custId);
    this.router.navigate([
      '/ventas/ov',
      custId
    ]);
   }

  
}
