
import { Component, inject, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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
import { rxResource } from '@angular/core/rxjs-interop';
import { UserInfoService } from '../../../../services/userInfo.service';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-orden-venta',
  imports: [HeaderPage, FormsModule, OrdenLines, ReactiveFormsModule, Modalg, OrdenHeader, SpinnerLoad, ButtonIcon],
  templateUrl: './orden-venta.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './orden-venta.css',
})
export default class OrdenVenta {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private ventasQueryService = inject(VentasQueryService);
  private emailAdminService = inject(EmailAdminService);
  private userInfoService = inject(UserInfoService);

  @ViewChild('modalG') modalG!: Modalg;
  @ViewChild('ordenLines') ordenLines!: OrdenLines;


  loading = signal (false);

  formHeader = this.fb.nonNullable.group({
    orderNum: [0],
    custID: ['', Validators.required],
    fechaRequerida: ['', Validators.required],
    TipoCilindros: ['PROPIO', Validators.required],
    ubicacion: [''],
    proyecto: [''],
    currencyCode: ['GTQ', Validators.required],
    TipoOperacion: ['', Validators.required]
  });

  orderNumView = signal<number>(0);

  defaultCliente: ClienteInfoOv = {
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
};
//Se utiliza rxResource para obtener la información del cliente en base a su ID
CustInfoOv = rxResource<ClienteInfoOv, { company: string | null; custID: string | null | undefined }>({
  defaultValue: this.defaultCliente,
  params: () => ({
    company: this.userInfoService.company(),
    custID: this.formHeader.value.custID
  }),
  stream: ({ params }) => {
    if (!params.company || !params.custID) {
      return of(this.defaultCliente);
    }

    return this.ventasQueryService.getClienteInfoOv(params.custID).pipe(
      map(data => data[0] ?? this.defaultCliente)
    );
  }
});

  creandoOV = signal(false);
  //Se utiliza rxResource para obtener la lista de monedas disponibles para la compañia
  LMonedas = rxResource<Moneda[], { company: string | null; custID: string | null | undefined }>({
      defaultValue: [],
      params: () => ({  
        company: this.userInfoService.company(),
        custID: this.formHeader.value.custID
      }),
      stream: ({ params }) => {
        if (!params.company || !params.custID) {
              return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
        }       
      return this.ventasQueryService.getMonedas(params.custID);
    }
  })

 


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
    });
  }

  CrearOrdenVenta() {

    if(this.creandoOV()) return; // Evitar doble click mientras se procesa la solicitud

    if (this.formHeader.valid) {
      const formData = this.formHeader.value;
      console.log('Datos del formulario:', formData);
      // Aquí puedes agregar la lógica para enviar los datos a tu servicio o API
    } else {
      this.modalG.showModalG('Error', 'Por favor, completa todos los campos requeridos antes de crear la orden de venta.');
      return;
    }
    if(this.ordenLines.lineas.length === 0) {
      this.modalG.showModalG('Error', 'No se han agregado lineas a la orden de venta. Por favor, agrega al menos una linea antes de crear la orden de venta.');
      return;
    }
  

    //Creando OV es para evitar el doble click en el boton de crear orden de venta mientras se procesa la solicitud
    this.creandoOV.set(true);

    const ordenRequest: CrearOvRequest = {
      CustID: this.formHeader.value.custID!,
      CustNum: this.CustInfoOv.value().Customer_CustNum || 0,
      CurrencyCod: this.formHeader.value.currencyCode!,
      Proyecto: this.formHeader.value.proyecto!,
      FechaR: new Date(this.formHeader.value.fechaRequerida!),
      TOperacion: this.formHeader.value.TipoOperacion!
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
              //ENVIAR CORREO AL REPRESENTANTE DE VENTAS DEL CLIENTE CON EL NUMERO DE ORDEN DE VENTA CREADA
              this.EnviarCorreo(response.OrderNum);

              this.creandoOV.set(false);
            console.log('Lineas agregadas exitosamente:', addLineResponse);
          }
          ,error: (error) => {
            console.error('Error agregando lineas a la orden de venta:', error);
            this.modalG.showModalG('Error', 'Ocurrió un error al agregar las líneas a la orden de venta. Por favor, inténtalo de nuevo.');
          }
        });

        
        
      },
      error: (error) => {
        console.error('Error creando la orden de venta:', error);
        this.modalG.showModalG('Error', 'Ocurrió un error al crear la orden de venta. Por favor, inténtalo de nuevo.');
        this.modalG.openModal();
      }
    });



  }

  EnviarCorreo(orderNum: number) {
    if(this.formHeader.value.orderNum === 0) {
      this.modalG.showModalG('Error', 'No se ha creado una orden de venta para enviar el correo. Por favor, crea una orden de venta primero.');
      return;
    }
    const correo:Correo = this.ordenLines.getCorreo();
    correo.para = this.CustInfoOv.value().SalesRep_EMailAddress || '';
    correo.mensaje = `Se ha creado la orden de venta número ${this.formHeader.value.orderNum} para el cliente ${this.CustInfoOv.value().Customer_Name}.\n` + correo.mensaje;

    correo.mensaje += `\nDirección: ${this.formHeader.value.ubicacion}\n\n Proyecto: ${this.formHeader.value.proyecto}\n\nFecha Requerida: ${this.formHeader.value.fechaRequerida}\n\nMoneda: ${this.formHeader.value.currencyCode}\n\n`;
    this.loading.set(true);
    this.emailAdminService.sendEmail(correo).subscribe({
        next: (response: CorreoResponse) => {
          if(response.status.toLowerCase() === 'ok') {
              this.modalG.showModalG('Orden de Venta Creada', `La orden de venta número ${orderNum} ha sido creada exitosamente.`);
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
  
//EVITAR QUE EL USUARIO CAMBIE EL TIPO DE CILINDRO SI YA HAY LINEAS AGREGADAS A LA ORDEN DE VENTA
  validarCambioTipoCilindro() {
    const totalLineas = this.ordenLines?.lineas?.length ?? 0;
    console.log('Total de lineas en la orden de venta:', totalLineas);
    if (totalLineas > 1) {
      this.formHeader.controls.TipoCilindros.disable();
    } else {
      this.formHeader.controls.TipoCilindros.enable();
    }
}


}
