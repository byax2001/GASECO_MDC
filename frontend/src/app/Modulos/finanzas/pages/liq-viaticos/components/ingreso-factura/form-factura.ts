import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LiqViaticosFacturaControls} from '../../interfaces/LiqViaticosForm.interface';
import { Inputg } from '../../../../../../shared/components/inputg/inputg';
import { DateInput } from '../../../../../../shared/components/date-input/date-input';

@Component({
  selector: 'FormFacturaLv',
  imports: [ReactiveFormsModule, Inputg, DateInput],
  templateUrl: './form-factura.html',
  styleUrl: './form-factura.css',
})
export class FormFactura {
  fb = inject(FormBuilder);
  showModal = signal (false);
  emitirFactura = output<FormGroup<LiqViaticosFacturaControls>>();

  //INGRESO DE UNA FACTURA A LIQUIDACIÓN DE VIATICOS
   facturaForm: FormGroup<LiqViaticosFacturaControls> =
    this.fb.nonNullable.group({
      NombreProveedor: [''],
      NitRtn: [''],
      NumeroFactura: [''],
      Serie: [''],
      MontoFactura: [0],
      CuentaGl: [''],
      Impuesto: [''],
      TipoFactura: [''],
      DescripcionFactura: [''],
      FechaFactura: ['']
    });



  openModal (){
    this.showModal.set(true);
  }
  closeModal (){
    this.showModal.set(false);
  }

  //EMITE LA FACTURA INGRESADA AL FORMULARIO DE LIQUIDACIÓN DE VIATICOS
  guardarFactura(){
    this.emitirFactura.emit(this.facturaForm);
    this.closeModal();
  }

  
  
}
