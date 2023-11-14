import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = '/api/empleados';

  constructor(private http:HttpClient) { }

  getEpps(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint).pipe(
      map(response => response as Empleado[])
    );
  }
}
