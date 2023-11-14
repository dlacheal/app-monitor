import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './proyecto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private urlEndPoint: string = '/api/proyectos';

  constructor(private http:HttpClient) { }

  getProyectos(): Observable<Proyecto[]> {

    return this.http.get<Proyecto[]>(this.urlEndPoint).pipe(
      map( response => response as Proyecto[] )
    );
  }
}