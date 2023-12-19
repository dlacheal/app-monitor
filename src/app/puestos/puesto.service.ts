import { Injectable } from '@angular/core';
import { Puesto } from './puesto';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private urlEndPoint: string = '/api/puestos';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.urlEndPoint).pipe(
      map( response => response as Puesto[] )
    );
  }

  createPuesto(puesto: Puesto): Observable<Puesto>{
    return this.http.post<Puesto>(this.urlEndPoint, puesto, {headers: this.httpHeaders});
  }

  getPuesto(id): Observable<Puesto>{
    return this.http.get<Puesto>(`${this.urlEndPoint}/${id}`);
  }

  updatePuesto(puesto: Puesto): Observable<Puesto>{
    return this.http.put<Puesto>(`${this.urlEndPoint}/${puesto.id}`, puesto, {headers: this.httpHeaders});
  }

  deletePuesto(id: number): Observable<Puesto>{
    return this.http.delete<Puesto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
