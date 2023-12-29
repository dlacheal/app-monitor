import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError} from 'rxjs';
import { Empleado } from './empleado';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = '/api/empleados';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) {}

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint).pipe(
    map( response => {
      let empleados = response as Empleado[];

      return empleados.map( empleado => {
        empleado.codigoPersona.nombres = empleado.codigoPersona.nombres.toUpperCase();
        empleado.codigoPersona.apellidos = empleado.codigoPersona.apellidos.toUpperCase();
        empleado.codigoPuesto.descripcion = empleado.codigoPuesto.descripcion.toUpperCase();
        empleado.tipoSangre = empleado.tipoSangre.toUpperCase();
        empleado.licencia = empleado.licencia.toUpperCase();
        return empleado;
      });
    })
    );
  }

  getEmpleadosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        // let categorias = response as Categoria[];
        (response.content as Empleado[]).map( empleado => {
          empleado.codigoPersona.nombres = empleado.codigoPersona.nombres.toUpperCase();
          empleado.codigoPersona.apellidos = empleado.codigoPersona.apellidos.toUpperCase();
          empleado.codigoPuesto.descripcion = empleado.codigoPuesto.descripcion.toUpperCase();
          empleado.tipoSangre = empleado.tipoSangre.toUpperCase();
          empleado.licencia = empleado.licencia.toUpperCase();
          return empleado;
        });
        return response;
      })
    );
  }

  getEmpleado(id): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/empleados'])
      console.error('empleado.service.getEmpleado(id): ' + e.error.mensaje);
      Swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
  }

  createEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('empleado.service.createEmpleado(empleado): ' + e.error.mensaje);
        // Swal.fire('Error al crear el empleado', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear el empleado', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear el empleado', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear el empleado', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.id}`, empleado, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('empleado.service.updateEmpleado(empleado): ' + e.error.mensaje);
        // Swal.fire('Error al editar el empleado', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear el empleado', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear el empleado', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear el empleado', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  deleEmpleado(id: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('empleado.service.deleEmpleado(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar el empleado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
