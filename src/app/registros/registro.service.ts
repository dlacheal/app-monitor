import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Registro } from './registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlEndPoint: string = '/api/registros';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getRegistros(): Observable<Registro[]>{
    return this.http.get<Registro[]>(this.urlEndPoint).pipe(
      map(response => response as Registro[])
    );
  }

  createRegistro(registro: Registro): Observable<Registro>{
    return this.http.post<Registro>(this.urlEndPoint, registro, {headers: this.httpHeaders});
  }

  getRegistro(id): Observable<Registro>{
    return this.http.get<Registro>(`${this.urlEndPoint}/${id}`);
  }

  updateRegistro(registro: Registro): Observable<Registro>{
    return this.http.put<Registro>(`${this.urlEndPoint}/${registro.id}`, registro, {headers: this.httpHeaders});
  }

  deleteRegistro(id: number): Observable<Registro>{
    return this.http.delete<Registro>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
