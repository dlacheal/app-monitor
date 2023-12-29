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
    map( response => {
      let proyectos = response as Proyecto[];

      return proyectos.map( proyecto => {
        proyecto.nombreProyecto = proyecto.nombreProyecto.toUpperCase();
        proyecto.ubicacion = proyecto.ubicacion.toUpperCase();
        return proyecto;
      });
    })
    );
  }

  getProyectosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Proyecto[]).map( proyecto => {
          proyecto.nombreProyecto = proyecto.nombreProyecto.toUpperCase();
          proyecto.ubicacion = proyecto.ubicacion.toUpperCase();
          return proyecto;
        });
        return response;
      })
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
    return this.http.post<Proyecto>(this.urlEndPoint, proyecto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('proyecto.service.createProyecto(empleado): ' + e.error.mensaje);
        // Swal.fire('Error al crear el proyecto', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear el proyecto', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear el proyecto', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear el proyecto', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updateProyecto(proyecto: Proyecto): Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.urlEndPoint}/${proyecto.id}`, proyecto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('proyecto.service.updateProyecto(empleado): ' + e.error.mensaje);
        // Swal.fire('Error al editar el proyecto', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al editar el proyecto', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al editar el proyecto', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al editar el proyecto', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  deleteProyecto(id: number): Observable<Proyecto>{
    return this.http.delete<Proyecto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('proyecto.service.deleteProyecto(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar el proyecto', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
