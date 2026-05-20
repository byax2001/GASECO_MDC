import { Component, inject, signal } from '@angular/core';
import { Inputg } from "../components/inputg/inputg";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { Modalg } from "../components/modalg/modalg";
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { UserInfoService } from '../../services/userInfo.service';
import  mapToInfoUser from '../../Mapper/InfoUser.mapper';
import { InfoAppResponse } from '../../interfaces/InfoAppResponse.interface';

@Component({
  selector: 'app-login-page',
  imports: [Inputg, ReactiveFormsModule, Modalg],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})


export default class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private infoUserService = inject(UserInfoService);
  private router = inject(Router);
  private cookieService = inject(CookieService);

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
      
      

    
      this.cookieService.set('token', response.token, { path: '/' });
      //Para mostrar el modal de bienvenida solo la primera vez que se inicia sesión, se utiliza sessionStorage para almacenar un indicador. Si el indicador ya existe, no se muestra el modal. Si no existe, se muestra el modal y luego se establece el indicador para futuras visitas. Al cerrar sesión, se elimina el indicador para que el modal vuelva a mostrarse en el próximo inicio de sesión.
      sessionStorage.removeItem('welcomeShown');

      this.infoUserService.getUserInfo(username, response.token).subscribe({
        next: (userInfo ) => {
          this.infoUserService.userInfo.set(mapToInfoUser(userInfo));
          this.infoUserService.rol.set(response.rol);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Failed to retrieve user info', error);
          return;
        }
      });


     


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

