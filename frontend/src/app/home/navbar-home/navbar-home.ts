import { Component, inject, input, output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '../../interfaces/Company.interface';
import { Modalact } from "../../shared/components/modalact/modalact";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserInfoService } from '../../services/userInfo.service';

@Component({
  selector: 'NavbarHome',
  imports: [Modalact, FormsModule],
  templateUrl: './navbar-home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar-home.css',
})
export class NavbarHome {

  companies = input.required<Company[]>();
  cookieService = inject (CookieService);
  router = inject(Router);
  userInfoService = inject(UserInfoService);

  @ViewChild('modalAct') modalAct!: Modalact;

  onSelectCompany(event: Event) {
    this.userInfoService.company.set((event.target as HTMLSelectElement).value);
    // Aquí puedes agregar la lógica para manejar la selección de la empresa, como navegar a una página específica o cargar datos relacionados con la empresa seleccionada.
  }

  openModal(){
    this.modalAct.showModalAct('Cierre de sesión', '¿Confirmar cierre de sesión?');
  }

  modalAction(event: boolean) {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
