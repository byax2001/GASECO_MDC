import { Component, input, ViewChild } from '@angular/core';
import { LiqViaticosFacturaControls} from '../../interfaces/LiqViaticosForm.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { ButtonIcon } from '../../../../../../shared/components/button-icon/button-icon';
import { FormFactura } from '../ingreso-factura/form-factura';

@Component({
  selector: 'liq-viaticos-lines',
  imports: [ButtonIcon, FormFactura],
  templateUrl: './liq-viaticos-lines.html',
  styleUrl: './liq-viaticos-lines.css',
})
export class LiqViaticosLines {
  formFacturas = input.required<FormArray<FormGroup<LiqViaticosFacturaControls>>>();
  @ViewChild ('FormFacturaLv') formFactura!: FormFactura;
  
  showFormFactura (){
    this.formFactura.openModal();
  }

  //Agrega una factura al FormArray de facturas en la liquidación de viáticos
  agregarFactura(factura: FormGroup<LiqViaticosFacturaControls>) {
    this.formFacturas().push(factura);
  }
}
