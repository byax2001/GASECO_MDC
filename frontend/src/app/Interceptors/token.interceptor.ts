import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

//Un interceptor no borra el resto de elementos del headers (method, url, params), sino que los mantiene y 
// añade el nuevo header con el token. 
// Si se usa append, se añade mas de un header Authorization teniendo dos  con el mismo nombre, 
// lo que puede causar problemas. En cambio, con setHeaders se reemplaza en este caso unicamente el header 
// Authorization existente por el nuevo valor, asegurando que solo haya un header Authorization en la petición.

export function TokenInterceptor(
 req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');

  //Con esto se evita mandar el token en peticiones login ya que no las necesita
    /*if(req.url.includes('/auth/login')){
    return next(req);
  }*/

  //Caso contrario se añade el token a la cabecera de la petición
  const newReq = req.clone({
    //headers: req.headers.append('Authorization', `Bearer ${token}`),
    setHeaders:{
        Authorization: `Bearer ${token}`
    }
  });

  //Si el token es invalido o ha expirado, el backend responde con un error 401, lo que hace que 
  // se borre el token de las cookies y se redirija al login.
  return next(newReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        cookieService.delete('token', '/');
        sessionStorage.clear();
        
        window.location.href = '/login';
      }

      return throwError(() => error);
    })
  );
}