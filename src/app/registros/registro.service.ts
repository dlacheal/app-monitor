import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Registro } from './registro';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlEndPoint: string = '/api/registros';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) { }

  getRegistros(): Observable<Registro[]>{
    return this.http.get<Registro[]>(this.urlEndPoint).pipe(
      map(response => response as Registro[])
    );
  }

  getRegistro(id): Observable<Registro>{
    return this.http.get<Registro>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/registros'])
        console.error('registro.service.getCategoria(id): ' + e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createRegistro(registro: Registro): Observable<Registro>{
    return this.http.post<Registro>(this.urlEndPoint, registro, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('registro.service.createEmpleado(registro): ' + e.error.mensaje);
        Swal.fire('Error al crear el registro', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateRegistro(registro: Registro): Observable<Registro>{
    return this.http.put<Registro>(`${this.urlEndPoint}/${registro.id}`, registro, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('registro.service.updateRegistro(registro): ' + e.error.mensaje);
        Swal.fire('Error al editar el registro', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteRegistro(id: number): Observable<Registro>{
    return this.http.delete<Registro>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('registro.service.deleteRegistro(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar el registro', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
