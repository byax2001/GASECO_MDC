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
  msgModal = input.required<string>();
  TitleModal = input.required<string>();

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
