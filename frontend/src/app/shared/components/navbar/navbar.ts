import { Component, computed, effect, inject, ViewChild, ChangeDetectionStrategy, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../../../services/userInfo.service';
import {FormsModule} from '@angular/forms';
import { Modalact } from '../modalact/modalact';
import Link from '../../../interfaces/Link.interface';
import Sucursal from '../../../interfaces/sucursal.interface';


@Component({
  selector: 'Navbar',
  imports: [RouterLink, FormsModule, Modalact],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.css',
})
export class Navbar {
  userInfoService = inject(UserInfoService);
  companies = computed(() => this.userInfoService.getCompaniesCmb());
  cookieService = inject (CookieService);
  router = inject(Router);
  subModulos = input.required<Link[]>();

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
    });

  }

  onSelectCompany(event: Event) {
    const selectedCompany = (event.target as HTMLSelectElement).value;
    this.userInfoService.company.set(selectedCompany);

    console.log('Empresa seleccionada:', selectedCompany);
  }
 
  abrirModal(){
    this.modalAct.showModalAct('Cierre de sesión', '¿Confirmar cierre de sesión?');
  }

  accionModal(event: boolean) {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/login']);
  }



}
