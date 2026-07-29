import { Component, inject, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PresupuestoRowForm } from '../Interface/PresupuestoRowForm.type';
import { PartOV } from '../../../orden-venta/components/interface/PartOV.interface';
import { VentasQueryService } from '../../../../services/ventasquery.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserInfoService } from '../../../../../../services/userInfo.service';
import { of } from 'rxjs';

@Component({
  selector: 'modal-add-lp',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add-lp.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './modal-add-lp.css',
})
export class ModalAddLP  {
  private fb = inject(FormBuilder);
  ventasQueryService = inject(VentasQueryService);
  userInfoService = inject(UserInfoService);
  TipoCustomer = signal<string[]>(['A', 'B', 'C', 'N']);

  Emisor = output<PresupuestoRowForm>();
  Parts = rxResource<PartOV[], { company: string | null }>({ 
      params: () => ({
        //CUANDO CAMBIE ESTO SE EJECUTARA EL STREAM
        company: this.userInfoService.company()
      }),
      stream: ({ params }) => {
      if (!params.company) { return of([]);}
      return this.ventasQueryService.getPartOv();
      }
  })

  LineaPresupuesto:PresupuestoRowForm = this.fb.nonNullable.group({
    CustID: '',
    customerName: ['', Validators.required],
    TipoCustomer: ['', Validators.required],
    partNum: ['', Validators.required],
    partDescription: ['', Validators.required],
    Calculated_UOM: ['', Validators.required],
    CodVendedor: '',
    Anio: 0,

    precioU: [0, [Validators.required, Validators.min(0.01)]],
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

  ngOnInit() {

    this.LineaPresupuesto.controls.partNum.valueChanges.subscribe(partNum => {
      const part = this.Parts.value()?.find(p => p.Part_PartNum === partNum);

      if (!part) return;

      this.LineaPresupuesto.patchValue({
        partDescription: part.Part_PartDescription,
        Calculated_UOM: part.Part_IUM,
        rowIdent: part.RowIdent
      });
    });

  }

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

  // PARA REINICIAR EL FORMULARIO CON VALORES POR DEFECTO
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

selectedPart(part: PartOV) {
  this.LineaPresupuesto.patchValue({
    partNum: part.Part_PartNum,
    partDescription: part.Part_PartDescription,
    Calculated_UOM: part.Part_IUM,
    rowIdent: part.RowIdent
  });
}
}
