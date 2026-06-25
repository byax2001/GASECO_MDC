
import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { OrdenLines } from "../orden-lines/orden-lines";
import { Inputg } from "../../../../shared/components/inputg/inputg";
import { VentasQueryService } from '../../../services/ventasquery.service';
import { ClienteInfoOv } from '../components/interface/ClienteInfoOv.interface';
import { Moneda } from '../../../interfaces/Moneda.interface';
import { CrearOvResponse } from '../components/interface/CrearOvResponse.interface';
import { CrearOvRequest } from '../components/interface/CrearOvRequest.interface';
import { Modalg } from '../../../../shared/components/modalg/modalg';

@Component({
  selector: 'orden-venta-header',
  imports: [FormsModule,  ReactiveFormsModule],
  templateUrl: './orden-header.html',
  styleUrl: './orden-header.css',
})
export default class OrdenHeader {
  private fb = inject(FormBuilder);

  formHeader = input.required<FormGroup>();
  orderNumView = input.required<number>();
  CustInfoOv = input.required<ClienteInfoOv>();
  LMonedas = input.required<Moneda[]>();
  creandoOV = input.required<boolean>();
}
