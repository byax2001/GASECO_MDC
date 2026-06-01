
import { Component, inject, signal } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormsModule } from '@angular/forms';
import { OrdenLines } from "./orden-lines/orden-lines";
import { Inputg } from "../../../shared/components/inputg/inputg";
import { VentasQueryService } from '../../services/ventasquery.service';
import { ClienteInfoOv } from '../../interfaces/ClienteInfoOv.interface';
import { Moneda } from '../../interfaces/Moneda.interface';

@Component({
  selector: 'app-orden-venta',
  imports: [HeaderPage, FormsModule, OrdenLines],
  templateUrl: './orden-venta.html',
  styleUrl: './orden-venta.css',
})
export default class OrdenVenta {
  fechaRequerida = signal<Date>(new Date());
  ubicacion = signal<string>('');
  custID = signal<string>('');
  CustInfoOv = signal<ClienteInfoOv | null>(null);
  CurrencyCode = signal<string>('GTQ');
  LMonedas = signal<Moneda[]>([]);

  private route = inject(ActivatedRoute);
  private ventasQueryService = inject(VentasQueryService);


  ngOnInit(): void {
    // Aquí podrías cargar datos iniciales, como clientes, productos, etc.
    this.route.params.subscribe((params) => {
      this.custID.set(params['custid'] || '');
      if (this.custID()) {
        this.ventasQueryService.getClienteInfoOv(this.custID()).subscribe((data) => {
          console.log('ID de cliente:', this.custID());
          console.log('Datos del cliente:', data);
          this.CustInfoOv.set(data[0] || null); // Asignar los datos del cliente a la señal
          if (data[0]?.Customer_CurrencyCode) {
            this.CurrencyCode.set(data[0].Customer_CurrencyCode);
          }
        });
      }else {
        console.log('No se proporcionó un ID de cliente en la URL');
      }
    });

    // Cargar monedas disponibles
    this.ventasQueryService.getMonedas(this.custID()).subscribe({
      next:(monedas) => { 
        this.LMonedas.set(monedas);
        //El primero que viene es la moneda default del cliente en base a como esta configurado en el baq
        // App_V_CurrencyCode
      }
    });
  }

  onSearch(query: string): void {}

  changeFechaRequerida(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fechaRequerida.set(new Date(input.value));
  }

  changeUbicacion(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ubicacion.set(input.value);
  }


}
