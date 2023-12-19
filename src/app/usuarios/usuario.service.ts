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
      map(response => response as Usuario[])
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
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders});
  }

  updateusuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders});
  }

  deleteUsuario(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
