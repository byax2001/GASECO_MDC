import { Component, effect, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-debounce',
  imports: [],
  templateUrl: './search-debounce.html',
  styleUrl: './search-debounce.css',
})
export class SearchDebounce {
  searchEmisor = output<string>();
  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) =>{
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      //Luego de 500ms de inactividad, se emite el valor del input
      this.searchEmisor.emit(value);
      console.log('Emitted value:', value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  })

}
