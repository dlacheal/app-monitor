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
    map( response => {
      let registros = response as Registro[];

      return registros.map( registro => {
        registro.codigoEmpleado.codigoPersona.nombres = registro.codigoEmpleado.codigoPersona.nombres.toUpperCase();
        registro.codigoEmpleado.codigoPersona.apellidos = registro.codigoEmpleado.codigoPersona.apellidos.toUpperCase();
        return registro;
      });
    })
    );
  }

  getRegistrosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Registro[]).map( registro => {
          registro.codigoEmpleado.codigoPersona.nombres = registro.codigoEmpleado.codigoPersona.nombres.toUpperCase();
          registro.codigoEmpleado.codigoPersona.apellidos = registro.codigoEmpleado.codigoPersona.apellidos.toUpperCase();
          return registro;
        });
        return response;
      })
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
        // console.error('registro.service.createEmpleado(registro): ' + e.error.mensaje);
        // Swal.fire('Error al crear el registro', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear el registro', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear el registro', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear el registro', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updateRegistro(registro: Registro): Observable<Registro>{
    return this.http.put<Registro>(`${this.urlEndPoint}/${registro.id}`, registro, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('registro.service.updateRegistro(registro): ' + e.error.mensaje);
        // Swal.fire('Error al editar el registro', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al editar el registro', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al editar el registro', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al editar el registro', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
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
