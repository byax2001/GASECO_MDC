import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'modalact',
  imports: [],
  templateUrl: './modalact.html',
  styleUrl: './modalact.css',
})
export class Modalact {

  showModal = signal(false);
  msgModal = input.required<string>();
  TitleModal = input.required<string>();
  ynAction = output<boolean>();

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  confirmAction() {
    this.ynAction.emit(true);
    this.closeModal();
  }
}
