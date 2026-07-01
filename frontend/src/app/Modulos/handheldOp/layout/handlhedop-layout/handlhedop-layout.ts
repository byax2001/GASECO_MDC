import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-handlhedop-layout',
  imports: [RouterOutlet],
  templateUrl: './handlhedop-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './handlhedop-layout.css',
})
export class HandlhedopLayout {

}
