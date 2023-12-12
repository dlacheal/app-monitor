import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = '/api/categorias';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint).pipe(
      map( response => response as Categoria[] )
    );
  }

  createCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders})
  }

}
