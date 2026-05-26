import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'PaginationTable',
  imports: [],
  templateUrl: './pagination-table.html',
  styleUrl: './pagination-table.css',
})
export class PaginationTable {
  rowTableSize = input.required<number>();
  currentPage = signal(1);
  pageSize = input<number>(100); // 100 por defecto, pero se puede configurar desde el componente padre
  pageChange = output<number>();

  
  totalPages = computed(() => {

    return Math.ceil(
      this.rowTableSize() / this.pageSize()
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
      this.setPage(this.currentPage() + 1);
    }

  }

  prevPage() {

    if (this.currentPage() > 1) {
      this.setPage(this.currentPage() - 1);
    }

}
setPage(page: number) {
    this.currentPage.set(page);
    this.pageChange.emit(page);
}


visiblePages = computed(() => {

  const total = this.totalPages();
  const current = this.currentPage();

  const maxVisible = 5;

  let start = Math.max(1, current - 4);
  let end = start + maxVisible - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

});
  

  

}
