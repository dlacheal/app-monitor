import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = '/api/usuarios';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  createUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders})
  }
}
