import { Component, effect, inject, signal } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LiqViaticosHeader } from './components/liq-viaticos-header/liq-viaticos-header';
import { UserInfoService } from '../../../../services/userInfo.service';
import { LiqViaticosFormControls } from './interfaces/LiqViaticosForm.interface';
import { LiqViaticosLines } from './components/liq-viaticos-lines/liq-viaticos-lines';

@Component({
  selector: 'app-liq-viaticos',
  imports: [HeaderPage, Modalg, LiqViaticosHeader, LiqViaticosLines],
  templateUrl: './liq-viaticos.html',
  styleUrl: './liq-viaticos.css',
})
export default class LiqViaticos {
  fb = inject(FormBuilder);
  infoRuta = inject(ActivatedRoute);
  idLiqVia = signal<number>(0);
  userInfoService = inject(UserInfoService);
  
  LiqViaticosForm = this.fb.nonNullable.group<LiqViaticosFormControls>({
    // Define el Header de la liquidación de viáticos, que incluye información como la compañía, el usuario, el ID de la liquidación, la moneda, la fecha de la liquidación, la descripción y el monto autorizado
     header: this.fb.nonNullable.group({
      company: ['', Validators.required], // Compañía a la que pertenece el usuario
      usuario: ['', Validators.required], // ID del usuario en Epicor
      desUsuario: ['', Validators.required], // Nombre completo del usuario
      idLiqVia: [0, Validators.required], // ID de la liquidación de viáticos (En este caso es el id de grupo del ingreso de Pagos en Epicor)
      moneda: [''],
      fhLiqVia: ['', Validators.required],
      descLiqVia: ['', Validators.required],
      montoAutorizado: [0, Validators.required],
      posteada: [false],
    }),
    //Las facturas contaran con Nombre Proveedor, Nit/rtn, numero de factura, serie, monto factura, cuenta gl, impuesto, tipo factura, desripción factura, fecha factura
    facturas: this.fb.nonNullable.array([
      this.fb.nonNullable.group({
        NombreProveedor: ['', Validators.required],
        NitRtn: ['', Validators.required],
        NumeroFactura: ['', Validators.required],
        Serie: ['', Validators.required],
        MontoFactura: [0, Validators.required],
        CuentaGl: ['', Validators.required],
        Impuesto: ['', Validators.required],
        TipoFactura: ['', Validators.required],
        DescripcionFactura: ['', Validators.required],
        FechaFactura: ['', Validators.required]
      })
    ]),

  });

  //CARGA DATOS INICIALES DEL SISTEMA, COMO LA COMPAÑIA, ID USUARIO EPICOR Y NOMBRE COMPLETO DEL USUARIO
  datosIniciales = effect(() => {

    const company = this.userInfoService.company();
    const usuario = this.userInfoService.EpicorU();
    const desUsuario = this.userInfoService.Desusuario();

    if (!company || !usuario) return;

    this.LiqViaticosForm.controls.header.patchValue({
      company,
      usuario,
      desUsuario
    });
});


  ngOnInit() {
    const idLiqViaParam = this.infoRuta.snapshot.paramMap.get('id');
    if (idLiqViaParam) {
      this.idLiqVia.set(Number(idLiqViaParam));
      this.LiqViaticosForm.controls.header.patchValue({ idLiqVia: Number(idLiqViaParam) });
    }
    
  }
}
