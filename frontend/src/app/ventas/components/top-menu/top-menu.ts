import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../../../services/userInfo.service';



@Component({
  selector: 'TopMenuVentas',
  imports: [RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.css',
})
export class TopMenuVentas {
  userInfoService = inject(UserInfoService);
  companies = computed(() => this.userInfoService.getCompaniesCmb());
  cookiesService = inject (CookieService);


  ngOnInit(): void {
    
    if(this.companies().length === 0){
      this.userInfoService.loadUserInfo();
    }

    // this.companyService.setCompany(this.companys()[0].cod);
  }

  onSelectCompany(event: Event) {
    const selectedCompany = (event.target as HTMLSelectElement).value;
    this.userInfoService.company.set(selectedCompany);

    console.log('Empresa seleccionada:', selectedCompany);
  }



}
