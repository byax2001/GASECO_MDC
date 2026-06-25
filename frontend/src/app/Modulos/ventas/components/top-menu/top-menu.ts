import { Component, computed, effect, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../../../../services/userInfo.service';
import {FormsModule} from '@angular/forms';
import { Modalact } from '../../../../shared/components/modalact/modalact';


@Component({
  selector: 'TopMenuVentas',
  imports: [RouterLink, FormsModule, Modalact],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.css',
})
export class TopMenuVentas {
  userInfoService = inject(UserInfoService);
  companies = computed(() => this.userInfoService.getCompaniesCmb());
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
