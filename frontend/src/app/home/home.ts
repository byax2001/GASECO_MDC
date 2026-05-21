import { Component, inject, signal, ViewChild } from '@angular/core';
import { Modalg } from "../shared/components/modalg/modalg";
import {NavbarHome} from "./navbar-home/navbar-home";
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  imports: [Modalg, RouterLink, NavbarHome],
  templateUrl: './home.html',
  styleUrl: './home.css',
})




export default class Home {

  @ViewChild('modalG') modalG!: Modalg;
  msgModal = signal('');
  TitleModal = signal('');
  cookieService = inject(CookieService);

  ngAfterViewInit() {
      const welcomeShown = sessionStorage.getItem('welcomeShown');
      if (!welcomeShown) {
        const username = this.cookieService.get('username');
        this.TitleModal.set(`¡Bienvenido, ${username}!`);
        this.msgModal.set('Inicio de sesión exitoso');
        this.modalG.openModal();
        sessionStorage.setItem('welcomeShown', 'true');
      }
  }

}
