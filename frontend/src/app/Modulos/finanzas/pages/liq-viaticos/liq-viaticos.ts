import { Component, inject } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-liq-viaticos',
  imports: [HeaderPage, Modalg],
  templateUrl: './liq-viaticos.html',
  styleUrl: './liq-viaticos.css',
})
export default class LiqViaticos {
  fb = inject(FormBuilder);
  

  ngOnInit() {
    console.log('LiqViaticos component initialized');
  }
}
