import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = '/api/categorias';

  constructor(private http:HttpClient) { }

  getCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.urlEndPoint).pipe(
      map( response => response as Categoria[] )
    );
  }
}
