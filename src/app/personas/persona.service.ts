import { Injectable } from '@angular/core';
import { Persona } from './persona';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = '/api/personas';

  constructor(private http:HttpClient) { }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint).pipe(
      map(response => response as Persona[])
    );
  }
}