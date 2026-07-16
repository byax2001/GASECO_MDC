import { Component, computed, effect, inject, ViewChild, ChangeDetectionStrategy, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../../../services/userInfo.service';
import {FormsModule} from '@angular/forms';
import { Modalact } from '../modalact/modalact';
import Link from '../../../interfaces/Link.interface';
import Sucursal from '../../../interfaces/sucursal.interface';


@Component({
  selector: 'NavbarSuc',
  imports: [RouterLink, FormsModule, Modalact],
  templateUrl: './navbarsuc.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbarsuc.css',
})
export class NavbarSuc {
  userInfoService = inject(UserInfoService);
  companies = computed(() => this.userInfoService.getCompaniesCmb());
  cookieService = inject (CookieService);
  router = inject(Router);
  subModulos = input.required<Link[]>();

  Sucursal: Sucursal[] = [
    { codigo: 'MfgSys', descripcion: 'Amatitlán', company: '165943' },
    { codigo: 'COM', descripcion: 'Comayagua', company: '165943B' },
    {codigo:'SNP', descripcion:'San Pedro Sula', company:'165943B' },
    {codigo:'TEG', descripcion:'Tegucigalpa', company:'165943B' }
  ];

  sucursalFiltred= computed<Sucursal[]>(() => {
    const selectedCompany = this.userInfoService.company();
    if(selectedCompany === '') return [];
    return this.Sucursal.filter(sucursal => sucursal.company === selectedCompany);
  });

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

      //SETEAR COMPANY
      const companies = this.companies();
      const selectedCompany = this.userInfoService.company();

      if (companies.length === 0) return;

      if (!selectedCompany) {
        this.userInfoService.company.set(companies[0].code);
      }

      //SETEAR PRIMERA SUCURSAL
      const sucursales = this.sucursalFiltred();
      const sucursalActual = this.userInfoService.sucursal();

       if (sucursales.length === 0) {
          this.userInfoService.sucursal.set('');
          return;
        }

        //some valida si la sucursal actual es valida para la empresa seleccionada, si no lo es, 
        // se setea la primera sucursal de la lista con la nueva empresa seleccionada
        // Por ejemplo si sucursal actual es "Amatitlán" y la empresa seleccionada es "GASECO HN"
        // ningun elemento de sucursales actualmente tiene codigo "Amatitlán", 
        // entonces se ejecuta el cambio de sucursal a la primera sucursal de la lista que es "Comayagua"
        const sucursalValida = sucursales.some(
          s => s.codigo === sucursalActual
        );

        if (!sucursalValida) {
          this.userInfoService.sucursal.set(sucursales[0].codigo);
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
