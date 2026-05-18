import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Company } from '../../interfaces/company.interface';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-top-menu',
  imports: [RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.css',
})
export class TopMenu {

  companys = signal<Company[]>([])
  cookiesService = inject (CookieService);
  companyService = inject(CompanyService);


  ngOnInit(): void {
    // Aquí puedes agregar cualquier lógica de inicialización que necesites
    const sucursal = this.cookiesService.get('sucursal');
    if(sucursal ==='ALL'){
      this.companys.set([
        {cod:'165943', name:'GASECO GT'},
        {cod:'165943B', name: 'GASECO HN'}
      ]);
    }else if (sucursal === '165943') {
      this.companys.set([
        {cod:'165943', name:'GASECO GT'}
      ]);
    }else if (sucursal === '165943B') {
      this.companys.set([
        {cod:'165943B', name: 'GASECO HN'}
      ]);
    }

    this.companyService.setCompany(this.companys()[0].cod);
  }

  onSelectCompany(event: Event) {
    const selectedCompany = (event.target as HTMLSelectElement).value;
    this.companyService.setCompany(selectedCompany);

    console.log('Empresa seleccionada:', selectedCompany);
  }



}
