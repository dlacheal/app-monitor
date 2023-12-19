import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './proyecto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private urlEndPoint: string = '/api/proyectos';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getProyectos(): Observable<Proyecto[]> {

    return this.http.get<Proyecto[]>(this.urlEndPoint).pipe(
      map( response => response as Proyecto[] )
    );
  }

  createProyecto(proyecto: Proyecto): Observable<Proyecto>{
    return this.http.post<Proyecto>(this.urlEndPoint, proyecto, {headers: this.httpHeaders});
  }

  getProyecto(id): Observable<Proyecto>{
    return this.http.get<Proyecto>(`${this.urlEndPoint}/${id}`);
  }

  updateProyecto(proyecto: Proyecto): Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.urlEndPoint}/${proyecto.id}`, proyecto, {headers: this.httpHeaders});
  }
}
