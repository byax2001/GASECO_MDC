import { Component, computed, effect, inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../../../../services/userInfo.service';
import {FormsModule} from '@angular/forms';
import { Modalact } from '../../../../shared/components/modalact/modalact';
import Sucursal from './interface/sucursal.interface';
import Link from '../../../../interfaces/Link.interface';


@Component({
  selector: 'TopMenuVentas',
  imports: [RouterLink, FormsModule, Modalact],
  templateUrl: './top-menu.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './top-menu.css',
})
export class TopMenuVentas {
  userInfoService = inject(UserInfoService);
  companies = computed(() => this.userInfoService.getCompaniesCmb());
  lsucursales: Sucursal[] = [
    { company: '165943', code: 'MfgSys', description: 'Amatitlan' },
    { company: '165943B', code: 'COM', description: 'Comayagua' },
    { company: '165943B', code: 'TEG', description: 'Tegucigalpa' }
  ]
/**   <li><a routerLink="/ventas/listaclientes">Lista de Clientes</a></li>
          <li><a routerLink="/ventas/presupuestos">Presupuestos</a></li>
          <li><a routerLink="/ventas/ovpendientes">Órdenes de Venta Pendientes</a></li> */
   subModulos: Link[] = [
      { descripcion: 'Lista de Clientes', ruta: '/ventas/listaclientes' },
      { descripcion: 'Presupuestos', ruta: '/ventas/presupuestos' },
      { descripcion: 'Órdenes de Venta Pendientes', ruta: '/ventas/ovpendientes' },
      {descripcion: 'Reporte de Ventas Vendedores', ruta: '/ventas/vendedores-rv'}
    ];
    
  sucfiltered = computed (()=>{
    const selectedCompany = this.userInfoService.company();
    if(!selectedCompany) return [];
    return this.lsucursales.filter(sucursal => sucursal.company === selectedCompany);
  })
  cookieService = inject (CookieService);
  router = inject(Router);
  @ViewChild('modalAct') modalAct!: Modalact;


  ngOnInit(): void {
    
    if(this.companies().length === 0){
      this.userInfoService.loadUserInfo();
    } else{
      
    }

    // this.companyService.setCompany(this.companys()[0].cod);
  }

  constructor() {
      effect(() => {
      const companies = this.companies();
      const selectedCompany = this.userInfoService.company();

      if (companies.length === 0) return;

      if (!selectedCompany) {
        this.userInfoService.company.set(companies[0].code);
      }
    });

  }

  onSelectCompany(event: Event) {
    const selectedCompany = (event.target as HTMLSelectElement).value;
    this.userInfoService.company.set(selectedCompany);

    console.log('Empresa seleccionada:', selectedCompany);
  }
 
  abrirModal(){
    this.modalAct.openModal();
  }

  accionModal(event: boolean) {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/login']);
  }



}
