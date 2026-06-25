
import { Component, inject, signal, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrdenLines } from "./orden-lines/orden-lines";
import { Inputg } from "../../../../shared/components/inputg/inputg";
import { VentasQueryService } from '../../services/ventasquery.service';
import { ClienteInfoOv } from './components/interface/ClienteInfoOv.interface';
import { Moneda } from '../../interfaces/Moneda.interface';
import { CrearOvResponse } from './components/interface/CrearOvResponse.interface';
import { CrearOvRequest } from './components/interface/CrearOvRequest.interface';
import { Modalg } from '../../../../shared/components/modalg/modalg';
import OrdenHeader from './orden-header/orden-header';
import { SpinnerLoad } from '../../../../shared/components/spinner-load/spinner-load';
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";
import { Correo } from '../../../../interfaces/Correo.interface';
import { EmailAdminService } from '../../../../services/email-admin.service';
import { CorreoResponse } from '../../../../interfaces/CorreoResponse.interface';

@Component({
  selector: 'app-orden-venta',
  imports: [HeaderPage, FormsModule, OrdenLines, ReactiveFormsModule, Modalg, OrdenHeader, SpinnerLoad, ButtonIcon],
  templateUrl: './orden-venta.html',
  styleUrl: './orden-venta.css',
})
export default class OrdenVenta {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private ventasQueryService = inject(VentasQueryService);
  private emailAdminService = inject(EmailAdminService);

  @ViewChild('modalG') modalG!: Modalg;
  @ViewChild('ordenLines') ordenLines!: OrdenLines;
  loading = signal (false);

  formHeader = this.fb.nonNullable.group({
    orderNum: [0],
    custID: ['', Validators.required],
    fechaRequerida: ['', Validators.required],
    ubicacion: [''],
    proyecto: [''],
    currencyCode: ['GTQ', Validators.required],
  });

  orderNumView = signal<number>(0);

  CustInfoOv = signal<ClienteInfoOv>({
    Customer_CustID: '',
    Customer_CustNum: 0,
    Customer_Name: '',
    Customer_TerritoryID: '',
    Customer_SalesRepCode: '',
    SalesRep_Name: '',
    SalesRep_EMailAddress: '',
    Customer_TermsCode: '',
    Terms_Description: '',
    Customer_CurrencyCode: '',
    Currency_CurrDesc: '',
    RowIdent: ''
  });
  LMonedas = signal<Moneda[]>([]);
  creandoOV = signal(false);

 


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
      Proyecto: this.formHeader.value.proyecto!,
      FechaR: new Date(this.formHeader.value.fechaRequerida!)
    }; 

    //Se muestra el spinner de carga mientras se procesa la solicitud de creación de orden de venta
    //Se hace scroll hacia arriba para mostrar el spinner de carga y evitar que el usuario piense que la aplicación no está respondiendo
     window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
    this.loading.set(true);

    this.ventasQueryService.postCrearOV(ordenRequest).subscribe({
      next: (response: CrearOvResponse) => {
        console.log('Orden de venta creada exitosamente:', response);
        this.formHeader.patchValue({
          orderNum: response.OrderNum
        });

        // SE EJECUTA EL METODO DEL HIJO PARA AGREGAR LAS LINEAS A LA ORDEN DE VENTA RECIEN CREADA, SE LE PASA EL NUMERO DE ORDEN DE VENTA OBTENIDO EN LA RESPUESTA DE LA API
        this.ordenLines.AgregarLineasOv(response.OrderNum).subscribe({
          next: (addLineResponse) => {
              //Finalizo el Proceso de creación de Orden de Venta
              //Se oculta el Spinner de carga
              this.loading.set(false);
              this.orderNumView.set(response.OrderNum);
              this.modalG.setModalTitle('Orden de Venta Creada');
              this.modalG.setModalMessage(
                `La orden de venta número ${response.OrderNum} ha sido creada exitosamente.`
              );
              this.modalG.openModal();
            console.log('Lineas agregadas exitosamente:', addLineResponse);
          }
          ,error: (error) => {
            console.error('Error agregando lineas a la orden de venta:', error);
          }
        });

        
        
      },
      error: (error) => {
        console.error('Error creando la orden de venta:', error);
        this.modalG.setModalTitle('Error al crear la orden de venta');
        this.modalG.setModalMessage('Ocurrió un error al crear la orden de venta. Por favor, inténtalo de nuevo.');
        this.modalG.openModal();
      }
    });



  }

  EnviarCorreo() {
    if(this.formHeader.value.orderNum === 0) {
      this.modalG.showModalG('Error', 'No se ha creado una orden de venta para enviar el correo. Por favor, crea una orden de venta primero.');
      return;
    }
    const correo:Correo = this.ordenLines.getCorreo();
    correo.para = this.CustInfoOv()?.SalesRep_EMailAddress || '';
    correo.mensaje = `Se ha creado la orden de venta número ${this.formHeader.value.orderNum} para el cliente ${this.CustInfoOv()?.Customer_Name}.\n` + correo.mensaje;

    correo.mensaje += `\nDirección: ${this.formHeader.value.ubicacion}\n\n Proyecto: ${this.formHeader.value.proyecto}\n\nFecha Requerida: ${this.formHeader.value.fechaRequerida}\n\nMoneda: ${this.formHeader.value.currencyCode}\n\n`;
    this.loading.set(true);
    this.emailAdminService.sendEmail(correo).subscribe({
        next: (response: CorreoResponse) => {
          if(response.status.toLowerCase() === 'ok') {
            this.modalG.showModalG('Correo Enviado', 'El correo ha sido enviado exitosamente al representante de ventas.');
          }else
          {
            this.modalG.showModalG('Error', `Ocurrió un error al enviar el correo: ${response.mensaje}`);
          }
          this.loading.set(false);
        },
        error: (error) => {
          this.modalG.showModalG('Error', `Ocurrió un error al enviar el correo: ${error.message}`);
          this.loading.set(false);
        }
    });


  }
  


}
