import { Injectable } from '@angular/core';
import { Persona } from './persona';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = '/api/personas';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint).pipe(
      map(response => response as Persona[])
    );
  }

  createPersona(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.urlEndPoint, persona, {headers: this.httpHeaders})
  }
}
