import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Epp } from './epp';

@Injectable({
  providedIn: 'root'
})
export class EppService {

  private urlEndPoint: string = '/api/epps';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getEpps(): Observable<Epp[]>{
    return this.http.get<Epp[]>(this.urlEndPoint).pipe(
      map(response => response as Epp[])
    );
  }

  createEpp(epp: Epp): Observable<Epp>{
    return this.http.post<Epp>(this.urlEndPoint, epp, {headers: this.httpHeaders})
  }

  getEpp(id): Observable<Epp>{
    return this.http.get<Epp>(`${this.urlEndPoint}/${id}`);
  }

  updateEpp(epp: Epp): Observable<Epp>{
    return this.http.put<Epp>(`${this.urlEndPoint}/${epp.id}`, epp, {headers: this.httpHeaders});
  }
}
