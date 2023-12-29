import { Injectable } from '@angular/core';
import { Puesto } from './puesto';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private urlEndPoint: string = '/api/puestos';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) { }

  getPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.urlEndPoint).pipe(
    map( response => {
      let puestos = response as Puesto[];

      return puestos.map( puesto => {
        puesto.descripcion = puesto.descripcion.toUpperCase();
        return puesto;
      });
    })
    );
  }

  getPuestosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Puesto[]).map( puesto => {
          puesto.descripcion = puesto.descripcion.toUpperCase();
          return puesto;
        });
        return response;
      })
    );
  }

  getPuesto(id): Observable<Puesto>{
    return this.http.get<Puesto>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/puestos'])
      console.error('puesto.service.getCategoria(id): ' + e.error.mensaje);
      Swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
  }

  createPuesto(puesto: Puesto): Observable<Puesto>{
    return this.http.post<Puesto>(this.urlEndPoint, puesto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('puesto.service.createPuesto(puesto): ' + e.error.mensaje);
        // Swal.fire('Error al crear el puesto', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear el puesto', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear el puesto', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear el puesto', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updatePuesto(puesto: Puesto): Observable<Puesto>{
    return this.http.put<Puesto>(`${this.urlEndPoint}/${puesto.id}`, puesto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('puesto.service.updatePuesto(puesto): ' + e.error.mensaje);
        // Swal.fire('Error al editar el puesto', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al eliminar el puesto', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al eliminar el puesto', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al eliminar el puesto', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  deletePuesto(id: number): Observable<Puesto>{
    return this.http.delete<Puesto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('puesto.service.deletePuesto(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar el puesto', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
