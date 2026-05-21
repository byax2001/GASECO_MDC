import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

//Un interceptor no borra el resto de elementos del headers (method, url, params), sino que los mantiene y 
// añade el nuevo header con el token. 
// Si se usa append, se añade mas de un header Authorization teniendo dos  con el mismo nombre, 
// lo que puede causar problemas. En cambio, con setHeaders se reemplaza en este caso unicamente el header 
// Authorization existente por el nuevo valor, asegurando que solo haya un header Authorization en la petición.

export function TokenInterceptor(
 req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const token = inject(CookieService).get('token');

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

 
  return next(newReq);
}