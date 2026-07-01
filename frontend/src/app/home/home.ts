import { Component, computed, inject, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Modalg } from "../shared/components/modalg/modalg";
import {NavbarHome} from "./navbar-home/navbar-home";
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../services/userInfo.service';
import Modulo from './components/interface/Modulo.interface';
import { Cardg } from '../shared/components/cardm/cardm';

@Component({
  selector: 'app-home',
  imports: [Modalg, NavbarHome, Cardg],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})




export default class Home {
  private router = inject(Router);
  @ViewChild('modalG') modalG!: Modalg;
  modulos = signal<Modulo[]>([
    { code: 'VENTAS', url: '/ventas', icon: 'icons/ventas.png', name: 'Ventas', description: 'Gestiona tus ventas de manera eficiente y sencilla.' },
    { code: 'MDC', url: '/cilindros', icon: 'icons/cilindros.png', name: 'Modulo de Cilindros', description: 'Gestiona tus cilindros de manera eficiente y sencilla.' },
    { code: 'A', url: '/moduloA', icon: 'icons/default.png', name: 'Módulo A', description: 'Descripción del Módulo A.' },
    { code: 'B', url: '/moduloB', icon: 'icons/default.png', name: 'Módulo B', description: 'Descripción del Módulo B.' },
    { code: 'C', url: '/moduloC', icon: 'icons/default.png', name: 'Módulo C', description: 'Descripción del Módulo C.' },
    { code: 'D', url: '/moduloD', icon: 'icons/default.png', name: 'Módulo D', description: 'Descripción del Módulo D.' },
  ]);
 
  cookieService = inject(CookieService);
  userInfoService = inject(UserInfoService);

  companies = computed(() => {
    return this.userInfoService.getCompaniesCmb();
  });

  ngOnInit() {
    if (this.companies().length === 0) {
    this.userInfoService.loadUserInfo();
    }
  }
  ngAfterViewInit() {
      const welcomeShown = sessionStorage.getItem('welcomeShown');
      if (!welcomeShown) {

        this.modalG.setModalTitle(`¡Bienvenido!`);
        this.modalG.setModalMessage('Inicio de sesión exitoso');
        this.modalG.openModal();
        sessionStorage.setItem('welcomeShown', 'true');
      }
  }

  navigateTo(modulo: Modulo) {
    if(!this.userInfoService.verifyAccess(modulo.code)){
      this.modalG.showModalG('Acceso Denegado', 'No tienes permisos para acceder a este módulo.');
      return;
    }

    switch(modulo.code){
      case 'VENTAS':
        this.router.navigate(['/ventas/lclientes']);
        break;

    }
  }


}
