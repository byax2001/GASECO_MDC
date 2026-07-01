
import { Component, inject, input, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { HeaderPage } from "../../../../../shared/components/header-page/header-page";
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { OrdenLines } from "../orden-lines/orden-lines";
import { Inputg } from "../../../../../shared/components/inputg/inputg";
import { VentasQueryService } from '../../../services/ventasquery.service';
import { ClienteInfoOv } from '../components/interface/ClienteInfoOv.interface';
import { Moneda } from '../../../interfaces/Moneda.interface';
import { CrearOvResponse } from '../components/interface/CrearOvResponse.interface';
import { CrearOvRequest } from '../components/interface/CrearOvRequest.interface';
import { Modalg } from '../../../../../shared/components/modalg/modalg';
import { ComboDefault } from '../../../../../interfaces/ComboDefault.interface';

@Component({
  selector: 'orden-venta-header',
  imports: [FormsModule,  ReactiveFormsModule],
  templateUrl: './orden-header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './orden-header.css',
})
export default class OrdenHeader {
  private fb = inject(FormBuilder);
  TipoCilindros = signal<ComboDefault[]>([{ code: 'PROPIO', description: 'PROPIOS' }, { code: 'AJENO', description: 'AJENOS' }]);

  TipoOperacion = signal<ComboDefault[]>(
    [
      { code: 'AUD', description: 'AUMENTO DE DOTACIÓN' },
      { code: 'CAC', description: 'CILINDRO A CAMBIO' },
      { code: 'CAA', description: 'CILINDRO A CAMBIO Y AUMENTO DE DOTACIÓN' },
      { code: 'CCV', description: 'CAMBIO CILINDRO VENDIDO' },
      { code: 'COM', description: 'COMERCIALIZACIÓN' },
      { code: 'LLC', description: 'LLENADO PROPIEDAD DEL CLIENTE' },
      { code: 'LCC', description: 'LLENADO CRIOGAS' },
      { code: 'OTR', description: 'OTRO' },
      { code: 'RMS', description: 'RIMS' },
      { code: 'VTA', description: 'VENTA DE CILINDRO' }
    ]
  )
  formHeader = input.required<FormGroup>();
  orderNumView = input.required<number>();
  CustInfoOv = input.required<ClienteInfoOv>();
  LMonedas = input.required<Moneda[]>();
  creandoOV = input.required<boolean>();
}
