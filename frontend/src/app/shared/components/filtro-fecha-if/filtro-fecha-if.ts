import { Component, inject, output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modalg } from "../modalg/modalg";
import { RangoFechaIF } from './interface/RangoFechaIF.interface';
import { ButtonIcon } from "../button-icon/button-icon";
import { DateInput } from "../date-input/date-input";

@Component({
  selector: 'FiltroFechaIF',
  imports: [Modalg, ButtonIcon, DateInput, FormsModule, ReactiveFormsModule],
  templateUrl: './filtro-fecha-if.html',
  styleUrl: './filtro-fecha-if.css',
})
export class FiltroFechaIF {
  private fb = inject(FormBuilder);
  FormDate = this.fb.nonNullable.group({
    FhInicial: ['', Validators.required],
    FhFinal: ['', Validators.required],
  });

  @ViewChild('modalG') modalG!: Modalg;
  rangoFechas = output<RangoFechaIF | null>();


  getRangoFechas():void {
    //Evitar que se haga la búsqueda si ya se está cargando
    const fechaI = this.FormDate.get('FhInicial')?.value;
    const fechaF = this.FormDate.get('FhFinal')?.value;

    if (this.FormDate.invalid || !fechaI || !fechaF ) {
      this.modalG.showModalG('Error', 'Debe seleccionar un rango de fechas válido');
      this.FormDate.markAllAsTouched();
      this.rangoFechas.emit(null);
      return;
    }

    if(fechaF < fechaI){
      this.modalG.showModalG('Error', 'La fecha final no puede ser menor a la fecha inicial');
      this.FormDate.markAllAsTouched();
      this.rangoFechas.emit(null);
      return;;
    }

    this.rangoFechas.emit({ FhInicial: fechaI, FhFinal: fechaF });
  }

}
