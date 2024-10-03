import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /** Atributos **/

  /** Constructor **/
  constructor(private authService: AuthService,
              private router: Router) {
  }

  /** Metodos **/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isAuthenticated()){
      if(this.isTokenExpidado()){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isTokenExpidado(): boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);

    //Obtenemos fecha Actual en  segundos
    let now = new Date().getTime()/1000;

    if(payload.exp < now){
      return true
    }
    return false;
  }


}
