import { Injectable } from '@angular/core';
import { Persona } from './persona';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = '/api/personas';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) { }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint).pipe(

    map( response => {
      let personas = response as Persona[];

      return personas.map( persona => {
        persona.nombres = persona.nombres.toUpperCase();
        persona.apellidos = persona.apellidos.toUpperCase();
        persona.direccion = persona.direccion.toUpperCase();
        persona.email = persona.email.toUpperCase();
        return persona;
      });
    })
    );
  }

  getPersonasPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Persona[]).map( persona => {
          persona.nombres = persona.nombres.toUpperCase();
          persona.apellidos = persona.apellidos.toUpperCase();
          persona.direccion = persona.direccion.toUpperCase();
          persona.email = persona.email.toUpperCase();
          return persona;
        });
        return response;
      })
    );
  }

  getPersona(id): Observable<Persona>{
    return this.http.get<Persona>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/personas'])
      console.error('persona.service.getCategoria(id): ' + e.error.mensaje);
      Swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
  }

  createPersona(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.urlEndPoint, persona, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('persona.service.createPersona(persona): ' + e.error.mensaje);
        // Swal.fire('Error al crear la persona', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al crear la persona', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al crear la persona', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al crear la persona', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  updatePersona(persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(`${this.urlEndPoint}/${persona.id}`, persona, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('persona.service.updatePersona(persona): ' + e.error.mensaje);
        // Swal.fire('Error al editar la persona', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            Swal.fire('Error al editar la persona', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            Swal.fire('Error al editar la persona', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            Swal.fire('Error al editar la persona', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  deletePersona(id: number): Observable<Persona>{
    return this.http.delete<Persona>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('persona.service.deletePersona(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar la persona', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
