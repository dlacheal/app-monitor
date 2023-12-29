import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = '/api/usuarios';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
    map( response => {
      let usuarios = response as Usuario[];

      return usuarios.map( usuario => {
        usuario.username = usuario.username.toUpperCase();
        usuario.codigoEmpleado.codigoPersona.nombres = usuario.codigoEmpleado.codigoPersona.nombres.toUpperCase();
        usuario.codigoEmpleado.codigoPersona.apellidos = usuario.codigoEmpleado.codigoPersona.apellidos.toUpperCase();
        return usuario;
      });
    })
    );
  }

  getUsuariosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Usuario[]).map( usuario => {
          usuario.username = usuario.username.toUpperCase();
          usuario.codigoEmpleado.codigoPersona.nombres = usuario.codigoEmpleado.codigoPersona.nombres.toUpperCase();
          usuario.codigoEmpleado.codigoPersona.apellidos = usuario.codigoEmpleado.codigoPersona.apellidos.toUpperCase();
          return usuario;
        });
        return response;
      })
    );
  }

  getPUsuario(id): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuarios'])
        console.error('usuario.service.getCategoria(id): ' + e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('usuario.service.createEmpleado(usuario): ' + e.error.mensaje);
        // Swal.fire('Error al crear el usuario', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear la categoria', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updateusuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('usuario.service.updateusuario(usuario): ' + e.error.mensaje);
        // Swal.fire('Error al editar el usuario', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al editar el usuario', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al editar el usuario', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al editar el usuario', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  deleteUsuario(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('usuario.service.deleteUsuario(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar el usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
