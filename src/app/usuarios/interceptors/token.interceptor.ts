import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  /** Atributos **/

  /** Constructor **/
  constructor(private authService: AuthService) {
  }

  /** Metodos **/
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let token = this.authService.token;
    if(token != null){
      const  authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      //console.log('TokenInterceptor => Bearer ' + token);
      return next.handle(authReq);
    }


    return next.handle(req);
  }
}
