import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError} from 'rxjs';
import { Notificacion } from './notificacion';
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  public urlEndPoint: string = '/api/notificaciones';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http:HttpClient,
              private router: Router) {}

  getNotificaciones(): Observable<Notificacion[]>{
    return this.http.get<Notificacion[]>(this.urlEndPoint).pipe(
    map( response => {
      let notificaciones = response as Notificacion[];

      return notificaciones.map( notificacion => {
        notificacion.descripcion = notificacion.descripcion.toUpperCase();
        return notificacion;
      });
    })
    );
  }

  getNotificacionesPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Notificacion[]).map( notificacion => {
          if(notificacion.descripcion != null){
            notificacion.descripcion = notificacion.descripcion.toUpperCase();
          }
          return notificacion;
        });
        return response;
      })
    );
  }

  getNotificacion(id): Observable<Notificacion>{
    return this.http.get<Notificacion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/notificaciones'])
        console.error('notificacion.service.getNotificacion(id): ' + e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createNotificacion(notificacion: Notificacion): Observable<Notificacion>{
    return this.http.post<Notificacion>(this.urlEndPoint, notificacion, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear la notificacion', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear la notificacion', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear la notificacion', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updateNotificacion(notificacion: Notificacion): Observable<Notificacion>{
    return this.http.put<Notificacion>(`${this.urlEndPoint}/${notificacion.id}`, notificacion, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear la notificacion', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear la notificacion', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear la notificacion', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  deleteNotificacion(id: number): Observable<Notificacion>{
    return this.http.delete<Notificacion>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('notificacion.service.deleteNotificacion(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar la notificacion', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFotograma(archivo: File, id): Observable<Notificacion>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(`${this.urlEndPoint}/uploads`, formData).pipe(
      map( (response: any) => response.notificacion as Notificacion ),
      catchError( e => {
        Swal.fire('Error al subir la foto de la notificacion', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
