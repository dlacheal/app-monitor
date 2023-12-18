import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = '/api/empleados';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint).pipe(
      map(response => response as Empleado[])
    );
  }

  createEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders})
  }

  getEmpleado(id): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`);
  }
}
