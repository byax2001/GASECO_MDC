import { Component, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { PresupuestoTable } from "./components/presupuesto-table/presupuesto-table";
import { VentasPresupuestoResponse } from './interface/VentasPresupuestoResponse.interface';
import { PresupuestoqueryServiceTs } from '../../services/presupuestoquery.service';
import { Inputg } from "../../../shared/components/inputg/inputg";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { Modalg } from "../../../shared/components/modalg/modalg";
import { SpinnerLoad } from "../../../shared/components/spinner-load/spinner-load";
import { Vendedores } from '../../interfaces/Vendedores.interface';
import { ComboDefault } from '../../../interfaces/ComboDefault.interface';

type PresupuestoHeaderForm = {
  anio: FormControl<number>;
  CodVendedor: FormControl<number>;
  CodPresupuestoPor: FormControl<string>;
};

@Component({
  selector: 'app-presupuestos',
  imports: [HeaderPage, PresupuestoTable, ReactiveFormsModule, FormsModule, ReactiveFormsModule, Modalg, SpinnerLoad],
  templateUrl: './presupuestos.html',
  styleUrl: './presupuestos.css',
})
export default class Presupuestos {
  presupuestoService = inject(PresupuestoqueryServiceTs);
  presupuestoData= signal< VentasPresupuestoResponse[] >([]);
  loading = signal<boolean>(true);
  Lvendedores = signal <Vendedores[]>([]);
  LTipoDato = signal<ComboDefault[]>([
    { code: 'V', description: 'Volumen' },
    { code: 'F', description: 'Facturación' }
  ]);

  @ViewChild('modalG') modalG!: Modalg;

  private fb = inject(FormBuilder);
  formHeader: FormGroup<PresupuestoHeaderForm> = this.fb.nonNullable.group({
  anio: [0, Validators.required],
  CodVendedor: [0, Validators.required],
  CodPresupuestoPor: ['V', Validators.required]
});
  

  ngOnInit(): void {
    this.presupuestoService.getVendedores().subscribe({
      next: (data) => {
        this.Lvendedores.set(data);
      },
      error: (error) => {
        this.modalG.showModalG("Error", "Ocurrió un error al obtener los vendedores. Por favor, inténtelo de nuevo más tarde.");
        console.error('Error al obtener los vendedores:', error);
      }
    });
  }

  buscarVentas() {
    this.loading.set(false);
    const { anio,CodPresupuestoPor, CodVendedor } = this.formHeader.getRawValue();
    if(this.formHeader.invalid) {
      this.modalG.showModalG("Error", "Por favor, complete todos los campos requeridos.");
      return;
    }

    this.presupuestoService.getVentasPresupuesto(anio, CodPresupuestoPor, CodVendedor).subscribe({
      next: (data) => {
        this.presupuestoData.set(data);
        if (this.presupuestoData().length === 0) {
          this.modalG.showModalG("Información", `No se encontraron datos para el año ${anio} y vendedor especificados.`);
        }
        this.loading.set(true);
      },
      error: (error) => {
        this.modalG.showModalG("Error", "Ocurrió un error al obtener los datos de presupuesto. Por favor, inténtelo de nuevo más tarde.");
        console.error('Error al obtener los datos de presupuesto:', error);
      }
    });
  }
}
