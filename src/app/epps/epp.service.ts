import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError} from 'rxjs';
import { Epp } from './epp';
import { throwError } from 'rxjs';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class EppService {

  private urlEndPoint: string = '/api/epps';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient,
              private router: Router) { }

  getEpps(): Observable<Epp[]>{
    return this.http.get<Epp[]>(this.urlEndPoint).pipe(
      map(response => response as Epp[])
    );
  }

  getEpp(id): Observable<Epp>{
    return this.http.get<Epp>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/epps'])
      console.error('epp.service.getCategoria(id): ' + e.error.mensaje);
      Swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
  }

  createEpp(epp: Epp): Observable<Epp>{
    return this.http.post<Epp>(this.urlEndPoint, epp, {headers: this.httpHeaders})
  }

  updateEpp(epp: Epp): Observable<Epp>{
    return this.http.put<Epp>(`${this.urlEndPoint}/${epp.id}`, epp, {headers: this.httpHeaders});
  }

  deleteEpp(id: number): Observable<Epp>{
    return this.http.delete<Epp>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
