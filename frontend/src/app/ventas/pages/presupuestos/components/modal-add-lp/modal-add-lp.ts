import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PresupuestoRowForm } from '../Interface/PresupuestoRowForm.type';


@Component({
  selector: 'modal-add-lp',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add-lp.html',
  styleUrl: './modal-add-lp.css',
})
export class ModalAddLP  {
  private fb = inject(FormBuilder);
  Emisor = output<PresupuestoRowForm>();

  LineaPresupuesto:PresupuestoRowForm = this.fb.nonNullable.group({
    CustID: '',
    customerName: ['', Validators.required],
    TipoCustomer: ['', Validators.required],
    partNum: ['', Validators.required],
    partDescription: ['', Validators.required],
    InvcDtl_SalesUM: ['', Validators.required],
    precioU: [0, [Validators.required, Validators.min(0)]],
    eneroBase: 0,
    febreroBase: 0,
    marzoBase: 0,
    abrilBase: 0,
    mayoBase: 0,
    junioBase: 0,
    julioBase: 0,
    agostoBase: 0,
    septiembreBase: 0,
    octubreBase: 0,
    noviembreBase: 0,
    diciembreBase: 0,
    porcentaje: 0,
    eneroP: 0,
    febreroP: 0,
    marzoP: 0,
    abrilP: 0,
    mayoP: 0,
    junioP: 0,
    julioP: 0,
    agostoP: 0,
    septiembreP: 0,
    octubreP: 0,
    noviembreP: 0,
    diciembreP: 0,
    rowIdent: ''
  });
  
  showModal = signal(false);
  msgModal = signal<string>("");
  TitleModal = signal<string>("");


  showModalG(title: string, msg: string) {
    this.TitleModal.set(title);
    this.msgModal.set(msg);
    this.showModal.set(true);
  }

  guardarLinea() {
    if(this.LineaPresupuesto.invalid) {
      this.showModalG("Error", "No se pueden guardar los datos. Por favor, revise que todos los campos estén completos y sean válidos.");
      return;
    }

    const linea: PresupuestoRowForm =
      this.fb.nonNullable.group({
        ...this.LineaPresupuesto.getRawValue()
      }) as PresupuestoRowForm;

    this.Emisor.emit(linea);
    this.LineaPresupuesto.reset(this.getDefaultLinea());
    this.showModal.set(false);


  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  getDefaultLinea() {
  return {
    CustID: '',
    customerName: '',
    TipoCustomer: '',
    partNum: '',
    partDescription: '',
    precioU: 0,
    eneroBase: 0,
    febreroBase: 0,
    marzoBase: 0,
    abrilBase: 0,
    mayoBase: 0,
    junioBase: 0,
    julioBase: 0,
    agostoBase: 0,
    septiembreBase: 0,
    octubreBase: 0,
    noviembreBase: 0,
    diciembreBase: 0,
    porcentaje: 0,
    eneroP: 0,
    febreroP: 0,
    marzoP: 0,
    abrilP: 0,
    mayoP: 0,
    junioP: 0,
    julioP: 0,
    agostoP: 0,
    septiembreP: 0,
    octubreP: 0,
    noviembreP: 0,
    diciembreP: 0,
    rowIdent: crypto.randomUUID()
  };
}
}
