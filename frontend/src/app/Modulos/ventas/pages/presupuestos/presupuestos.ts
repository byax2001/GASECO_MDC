import { Component, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { PresupuestoTable } from "./components/presupuesto-table/presupuesto-table";
import { VentasPresupuestoResponse } from './interface/VentasPresupuestoResponse.interface';
import { PresupuestoqueryServiceTs } from '../../services/presupuestoquery.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { ComboDefault } from '../../../../interfaces/ComboDefault.interface';
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { UserInfoService } from '../../../../services/userInfo.service';
import { finalize, of } from 'rxjs';


type PresupuestoHeaderForm = {
  anio: FormControl<number>;
  CodVendedor: FormControl<number>;
  CodPresupuestoPor: FormControl<string>;
};

@Component({
  selector: 'app-presupuestos',
  imports: [HeaderPage, PresupuestoTable, ReactiveFormsModule, FormsModule, Modalg, SpinnerLoad, ButtonIcon],
  templateUrl: './presupuestos.html',
  styleUrl: './presupuestos.css',
})
export default class Presupuestos {
  presupuestoService = inject(PresupuestoqueryServiceTs);
  presupuestoData= signal< VentasPresupuestoResponse[] >([]);
  userInfoService = inject(UserInfoService);

  loading = signal<boolean>(false);

  Lvendedores = rxResource({
    params: () => ({
      //CUANDO CAMBIE ESTO SE EJECUTARA EL STREAM
      company: this.userInfoService.company()
    }),
    stream: ({ params }) => {
    if (!params.company) { return of([]);}

    this.formHeader.patchValue({
      CodVendedor: 0
    });


    this.loading.set(true);
    return this.presupuestoService.getVendedores().pipe(
      finalize(() => {
        this.loading.set(false);
      })
    );
  }
  });


  LTipoDato = signal<ComboDefault[]>([
    { code: 'V', description: 'Volumen' },
    { code: 'F', description: 'Facturación' }
  ]);

  @ViewChild('modalG') modalG!: Modalg;
  @ViewChild('presupuestoTable') presupuestoTable!: PresupuestoTable;

  private fb = inject(FormBuilder);
  formHeader: FormGroup<PresupuestoHeaderForm> = this.fb.nonNullable.group({
  anio: [0, Validators.required],
  CodVendedor: [0, Validators.required],
  CodPresupuestoPor: ['V', Validators.required]
});
  

  ngOnInit(): void {
    //Se configura un Listener/Escuchador para el formulario, cuando se realice un cambio en el tipo de 
    // presupuesto, se debe convertir los valores de las filas del presupuesto. Si es Facturación por 
    // dinero y si es por Volumen por unidades de venta.
     
      this.formHeader.controls.CodPresupuestoPor.valueChanges.subscribe(value => {
        if (!this.presupuestoTable) return;
        if (this.presupuestoTable.filas.length === 0) return;

        const { anio, CodVendedor } = this.formHeader.getRawValue();

        this.loading.set(true);

        this.presupuestoService.getVentasPresupuesto(anio, value, CodVendedor)
        .subscribe({
          next: (data) => {
            this.presupuestoTable.actualizarBasesSinReset(data);

            if (value === 'F') {
              this.presupuestoTable.convertirVolumenAFacturacion();
            }

            if (value === 'V') {
              this.presupuestoTable.convertirFacturacionAVolumen();
            }

            this.loading.set(false);
          },
          error: (error) => {
            this.loading.set(false);
            this.modalG.showModalG("Error", "No se pudo actualizar el tipo de presupuesto.");
            console.error(error);
          }
        });
      })
      ;
  }

  getVendedores(){
       //Una vez cargada la información del usuario, se procede a cargar los vendedores
          this.presupuestoService.getVendedores().subscribe({
          next: (data) => {
            this.Lvendedores.set(data);
          },
          error: (error) => {
            this.modalG.showModalG("Error", "Ocurrió un error al obtener los vendedores. Por favor, inténtelo de nuevo más tarde.");
            console.error('Error al obtener los vendedores:', error);
          }
          // =====================================================================
        });
    }

  buscarVentas() {
    this.loading.set(true);
    const { anio,CodPresupuestoPor, CodVendedor } = this.formHeader.getRawValue();
    if(this.formHeader.invalid) {
      this.modalG.showModalG("Error", "Por favor, complete todos los campos requeridos.");
      this.loading.set(false);
      return;
    }
    if(this.formHeader.controls.anio.value! < 2025 || this.formHeader.controls.anio.value! > new Date().getFullYear()) {
      this.modalG.showModalG("Error", "Por favor, ingrese un año válido.");
      this.loading.set(false);
      return;
    }
    if(this.formHeader.controls.CodVendedor.value! <= 0) {
      this.modalG.showModalG("Error", "Por favor, seleccione un vendedor.");
      this.loading.set(false);
      return;
    }


    this.presupuestoService.getVentasPresupuesto(anio, CodPresupuestoPor, CodVendedor).subscribe({
      next: (data) => {
        this.presupuestoData.set(data);
        if (this.presupuestoData().length === 0) {
          this.modalG.showModalG("Información", `No se encontraron datos para el año ${anio} y vendedor especificados.`);
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.modalG.showModalG("Error", "Ocurrió un error al obtener los datos de presupuesto. Por favor, inténtelo de nuevo más tarde.");
        console.error('Error al obtener los datos de presupuesto:', error);
      }
    });
  }
}
