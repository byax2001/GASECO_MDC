import { Component, computed, effect, HostListener, inject, input, signal, ViewChild } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente.interface';
import { PaginationTable } from "../../../../shared/components/pagination-table/pagination-table";
import { Router, RouterLink} from '@angular/router';
import { Modalg } from "../../../../shared/components/modalg/modalg";


@Component({
  selector: 'app-table-clientes',
  imports: [PaginationTable, Modalg],
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
  @ViewChild('ModalG') ModalG!: Modalg;

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
   createOV(customer: Cliente) {
    console.log('Crear OV para cliente:', customer.Customer_CustID);
    if(customer.Calculated_Estado !== "Activo"){
      this.ModalG.showModalG("Cliente Bloqueado", "No se puede crear una orden de venta para un cliente inactivo. Por favor, contacte con el área encargada para más información.");
      return;
    }

    this.router.navigate([
      '/ventas/ov',
      customer.Customer_CustID
    ]);
   }

   CilEnCliente(customer: Cliente) {
    console.log('Ir a Cilindros en Cliente para cliente:', customer.Customer_CustID);
    this.router.navigate([
      '/ventas/cilcli',
      customer.Customer_CustID
    ]);
   }

  
}
