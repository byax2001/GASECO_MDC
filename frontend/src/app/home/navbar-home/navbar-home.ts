import { Component, inject, input, output, ViewChild } from '@angular/core';
import { Company } from '../../interfaces/Company.interface';
import { Modalact } from "../../shared/components/modalact/modalact";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'NavbarHome',
  imports: [Modalact],
  templateUrl: './navbar-home.html',
  styleUrl: './navbar-home.css',
})
export class NavbarHome {
  companies = input.required<Company[]>();
  companySelected = output<string>();
  cookieService = inject (CookieService);

  @ViewChild('modalAct') modalAct!: Modalact;

  onSelectCompany(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCompanyCode = selectElement.value;
    console.log('Selected company code:', selectedCompanyCode);
    this.companySelected.emit(selectedCompanyCode);
    // Aquí puedes agregar la lógica para manejar la selección de la empresa, como navegar a una página específica o cargar datos relacionados con la empresa seleccionada.
  }

  openModal(){
    this.modalAct.openModal();
  }

  modalAction(event: boolean) {
    this.cookieService.delete('token');
    window.location.href = '/login';
  }
}
