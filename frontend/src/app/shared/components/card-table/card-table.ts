import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'CardTable',
  imports: [],
  templateUrl: './card-table.html',
  styleUrl: './card-table.css',
})
export class CardTable {
  data = input.required<Record<string, any>>();
  titulo = input.required<string>();

  // Todos los elementos excepto el primero
  elementos = computed(() => {
    return Object.entries(this.data()).slice(1);
  });

}


