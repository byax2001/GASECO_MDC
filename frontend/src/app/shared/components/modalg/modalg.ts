import { Component, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'modalg',
  imports: [NgClass],
  templateUrl: './modalg.html',
  styleUrl: './modalg.css',
})
export class Modalg {
  showModal = signal(false);
  msgModal = signal<string>("");
  TitleModal = signal<string>("");

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  setModalMessage(message: string) {
    this.msgModal.set(message);
  }

  setModalTitle(title: string) {
    this.TitleModal.set(title);
  }

}
