
import { Component, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrdenLines } from "./orden-lines/orden-lines";
import { Inputg } from "../../../shared/components/inputg/inputg";
import { VentasQueryService } from '../../services/ventasquery.service';
import { ClienteInfoOv } from '../../interfaces/ClienteInfoOv.interface';
import { Moneda } from '../../interfaces/Moneda.interface';
import { CrearOvResponse } from '../../interfaces/CrearOvResponse.interface';
import { CrearOvRequest } from '../../interfaces/CrearOvRequest.interface';
import { Modalg } from '../../../shared/components/modalg/modalg';

@Component({
  selector: 'app-orden-venta',
  imports: [HeaderPage, FormsModule, OrdenLines, ReactiveFormsModule, Modalg],
  templateUrl: './orden-venta.html',
  styleUrl: './orden-venta.css',
})
export default class OrdenVenta {
  private fb = inject(FormBuilder);

  formHeader = this.fb.nonNullable.group({
    orderNum: [0],
    custID: ['', Validators.required],
    fechaRequerida: ['', Validators.required],
    ubicacion: [''],
    proyecto: [''],
    currencyCode: ['GTQ', Validators.required],
  });

  CustInfoOv = signal<ClienteInfoOv | null>(null);
  LMonedas = signal<Moneda[]>([]);
  creandoOV = signal(false);

  private route = inject(ActivatedRoute);
  private ventasQueryService = inject(VentasQueryService);
  @ViewChild('modalG') modalG!: Modalg;

  ngOnInit(): void {
    // Cargar Datos del Cliente al cargar la página
    // Metodo para obtener información de la URL y cargar datos relacionados al cliente
    this.route.params.subscribe((params) => {
      //Obtener el ID del cliente desde la URL
      const custID = params['custid'] || '';

      //Actualizar el formulario con el ID del cliente obtenido de la URL
      this.formHeader.patchValue({
        custID
      });

      //Si no se proporciona un ID de cliente, mostrar un mensaje de error en la consola y no continuar con las llamadas a la API
      if (!custID) {
        console.log('No se proporcionó un ID de cliente en la URL');
        return;
      }

      //Obtener información del cliente para la orden de venta en base al ID del cliente obtenido de la URL
      this.ventasQueryService.getClienteInfoOv(custID).subscribe({

        //Si la llamada a la API es exitosa, actualizar la señal CustInfoOv con la información del cliente obtenida y actualizar el campo de moneda en el formulario con la moneda del cliente
        next: (data) => {
          //Obtener el primer cliente del array de datos (en caso de que la API devuelva un array) o establecerlo como null si no hay datos
          const cliente = data[0] || null;
          //Se actualiza la señal CustInfoOv con la información del cliente obtenida de la API
          this.CustInfoOv.set(cliente);

          //Si el cliente no es null, se actualiza el campo de moneda en el formulario con la moneda del cliente obtenida de la API. Si el cliente es null, se establece la moneda como 'GTQ' por defecto
          if (cliente) {
            this.formHeader.patchValue({
              currencyCode: cliente.Customer_CurrencyCode ?? 'GTQ'
            });

          }

        },

        error: (error) => {
          console.error('Error obteniendo información del cliente', error);
        }

      });

      //Obtener la lista de monedas disponibles para la compañia
      this.ventasQueryService.getMonedas(custID).subscribe({

        next: (monedas) => {
          this.LMonedas.set(monedas);
        },

        error: (error) => {
          console.error('Error obteniendo monedas', error);
        }

      });

    });
  }

  CrearOrdenVenta() {
    if (this.formHeader.valid && this.creandoOV() === false) {
      const formData = this.formHeader.value;
      console.log('Datos del formulario:', formData);
      // Aquí puedes agregar la lógica para enviar los datos a tu servicio o API
    } else {
      console.log('Formulario no válido');
    }
    //Creando OV es para evitar el doble click en el boton de crear orden de venta mientras se procesa la solicitud
    this.creandoOV.set(true);

    const ordenRequest: CrearOvRequest = {
      CustID: this.formHeader.value.custID!,
      CustNum: this.CustInfoOv()?.Customer_CustNum || 0,
      CurrencyCod: this.formHeader.value.currencyCode!,
      FechaR: new Date(this.formHeader.value.fechaRequerida!)
    }; 

    this.ventasQueryService.postCrearOV(ordenRequest).subscribe({
      next: (response: CrearOvResponse) => {
        console.log('Orden de venta creada exitosamente:', response);
        this.formHeader.patchValue({
          orderNum: response.OrderNum
        });

        this.modalG.setModalTitle('Orden de Venta Creada');
        this.modalG.setModalMessage(`La orden de venta número ${response.OrderNum} ha sido creada exitosamente.`);
        this.modalG.openModal();
        
      },
      error: (error) => {
        console.error('Error creando la orden de venta:', error);
        this.modalG.setModalTitle('Error al crear la orden de venta');
        this.modalG.setModalMessage('Ocurrió un error al crear la orden de venta. Por favor, inténtalo de nuevo.');
        this.modalG.openModal();
      }
    });



  }

  


}
