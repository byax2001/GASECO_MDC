import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'modal-scan-cil',
  imports: [],
  templateUrl: './modal-scan-cil.html',
  styleUrl: './modal-scan-cil.css',
})
export class ModalScanCil {
  showModal = signal(false);
  msgModal = signal<string>('');
  TitleModal = signal<string>('');
  rEstado = output<string>();

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

  emitirEstado(estado: string){
    this.rEstado.emit(estado)
  }
}
