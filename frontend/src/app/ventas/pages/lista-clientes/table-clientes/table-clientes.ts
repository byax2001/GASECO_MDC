import { Component, computed, HostListener, input, signal } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente.interface';


@Component({
  selector: 'app-table-clientes',
  imports: [],
  templateUrl: './table-clientes.html',
  styleUrl: './table-clientes.css',
})
export class TableClientes {

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

  
  totalPages = computed(() => {

    return Math.ceil(
      this.lclientes().length / this.pageSize
    );
  });

  //Genera un array con el numero de paginas para mostrar los botones de paginacion
  //Impreso seria algo asi como [1, 2, 3, 4, 5] si hay 5 paginas
  pages = computed(() =>
    Array.from(
      { length: this.totalPages() },
      (_, i) => i + 1
    )
  );

  nextPage() {

    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }

  }

  prevPage() {

    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }

}
  

  
}
