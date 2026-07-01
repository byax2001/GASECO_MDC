import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-button-back',
  imports: [],
  templateUrl: './button-back.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './button-back.css',
})
export class ButtonBack {
  location = inject(Location);
  goBack(){
    this.location.back();
  }

}
