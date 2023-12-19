import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './proyecto';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private urlEndPoint: string = '/api/proyectos';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) { }

  getProyectos(): Observable<Proyecto[]> {

    return this.http.get<Proyecto[]>(this.urlEndPoint).pipe(
      map( response => response as Proyecto[] )
    );
  }

  getProyecto(id): Observable<Proyecto>{
    return this.http.get<Proyecto>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/proyectos'])
      console.error('proyecto.service.getCategoria(id): ' + e.error.mensaje);
      Swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
  }

  createProyecto(proyecto: Proyecto): Observable<Proyecto>{
    return this.http.post<Proyecto>(this.urlEndPoint, proyecto, {headers: this.httpHeaders});
  }

  updateProyecto(proyecto: Proyecto): Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.urlEndPoint}/${proyecto.id}`, proyecto, {headers: this.httpHeaders});
  }

  deleteProyecto(id: number): Observable<Proyecto>{
    return this.http.delete<Proyecto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
