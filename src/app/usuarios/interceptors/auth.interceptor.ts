import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {of,Observable, throwError} from 'rxjs';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {map, catchError} from 'rxjs/operators';
import Swal from "sweetalert2";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /** Atributos **/

  /** Constructor **/
  constructor(private authService: AuthService,
              private router: Router) {
  }

  /** Metodos **/
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        //NO AUTORIZADO (credenciales invalidas)
        if(e.status == 401){
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          //Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes autorización a este recurso!`, 'warning')
          this.router.navigate(['/login']);
        }

        //ACCESO PROHIBIDO (FORBIDDEN - (credenciales validas, rol no permitido)
        if(e.status==403){
          console.log('AuthInterceptor: ' + this.authService.usuario.codigoEmpleado);
          Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning')
          this.router.navigate(['/login']);

        }
        return throwError(e);

      })

    );
  }
}
