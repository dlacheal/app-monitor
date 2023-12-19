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
      map( response => response as Puesto[] )
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
    return this.http.post<Puesto>(this.urlEndPoint, puesto, {headers: this.httpHeaders});
  }

  updatePuesto(puesto: Puesto): Observable<Puesto>{
    return this.http.put<Puesto>(`${this.urlEndPoint}/${puesto.id}`, puesto, {headers: this.httpHeaders});
  }

  deletePuesto(id: number): Observable<Puesto>{
    return this.http.delete<Puesto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
