import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Epp } from './epp';

@Injectable({
  providedIn: 'root'
})
export class EppService {

  private urlEndPoint: string = '/api/epps';

  constructor(private http:HttpClient) { }

  getEpps(): Observable<Epp[]>{
    return this.http.get<Epp[]>(this.urlEndPoint).pipe(
      map(response => response as Epp[])
    );
  }
}
