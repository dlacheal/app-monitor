import { Injectable } from '@angular/core';
import { Puesto } from './puesto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private urlEndPoint: string = '/api/puestos';

  constructor(private http:HttpClient) { }

  getPuestos(): Observable<Puesto[]> {

    return this.http.get<Puesto[]>(this.urlEndPoint).pipe(
      map( response => response as Puesto[] )
    );
  }
}


