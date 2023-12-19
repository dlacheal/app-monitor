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
      map(response => response as Empleado[])
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
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders});
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.id}`, empleado, {headers: this.httpHeaders});
  }

  deleEmpleado(id: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
