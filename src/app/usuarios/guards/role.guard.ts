import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import Swal from "sweetalert2";
import {Usuario} from "../usuario";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  /** Atributos **/


  /** Constructor **/
  constructor(private authService: AuthService,
              private router: Router) {
  }

  /** Metodos **/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.authService.isAuthenticated()){
      //Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes autorización a este recurso!`, 'warning')
      this.router.navigate(['/login']);
      return false;
    }

    let role = route.data['role'] as string;
    console.log(role);
    if(this.authService.hasRole(role)){
      return true
    }

    //Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!!!`, 'warning')
    Swal.fire('Acceso denegado', `Hola, no tienes acceso a este recurso!!!`, 'warning')
    let codEmpleado: number = +`${this.authService.usuario.username}`;
    console.log(codEmpleado);
    this.router.navigate(['/login']);

    return false;
  }



}
