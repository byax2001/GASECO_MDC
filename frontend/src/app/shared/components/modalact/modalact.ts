import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'modalact',
  imports: [],
  templateUrl: './modalact.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './modalact.css',
})
export class Modalact {

  showModal = signal(false);
  msgModal = signal<string>('');
  TitleModal = signal<string>('');
  ynAction = output<boolean>();

  showModalAct(title: string, msg: string) {
    this.TitleModal.set(title);
    this.msgModal.set(msg);
    this.openModal();
  }

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
