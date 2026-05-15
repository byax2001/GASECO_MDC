import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Inputg } from "../components/inputg/inputg";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Modalg } from "../components/modalg/modalg";
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  imports: [Inputg, ReactiveFormsModule, Modalg],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})


export default class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  @ViewChild('modalG') modalG!: Modalg;

  msgModal = signal('');
  TitleModal = signal('');

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(event?: Event) {
   if (this.loginForm.invalid) {
    console.log('Form is invalid');
    return;
  }

  const { username, password } = this.loginForm.getRawValue();

  this.authService.login(username, password).subscribe({
    next: (response) => {
      console.log('Login successful', response);
      // Aquí puedes guardar el token en localStorage o en un servicio de autenticación
      this.msgModal.update(() => 'Inicion de Sesión exitoso');
      this.TitleModal.update(() => 'Éxito');
      this.modalG.openModal();

    },
    error: (error) => {
      console.error('Login failed', error);
      this.TitleModal.update(() => 'Error');

      if (error.status === 401) {

        this.msgModal.set('Usuario o contraseña incorrectos');

      } else {

        this.msgModal.set(
          'Login failed: ' +
          (error.error?.message || 'Unknown error')
        );

      }

      this.modalG.openModal();
    }
  });

  
  }

  
}

