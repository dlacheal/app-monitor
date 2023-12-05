import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Registro } from './registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlEndPoint: string = '/api/registros';

  constructor(private http:HttpClient) { }

  getEpps(): Observable<Registro[]>{
    return this.http.get<Registro[]>(this.urlEndPoint).pipe(
      map(response => response as Registro[])
    );
  }
}
