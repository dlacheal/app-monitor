import {Injectable} from '@angular/core';
import {Categoria} from './categoria';
import {map, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = '/api/categorias';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint).pipe(
      map( response => {
        let categorias = response as Categoria[];

        return categorias.map( categoria => {
          categoria.descripcion = categoria.descripcion.toUpperCase();
          return categoria;
        });
      })
    );
  }

  getCategoria(id): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/categorias'])
        console.error('categoria.service.getCategoria(id): ' + e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders}).pipe(
      catchError(e => {
          // console.error('categoria.service.createCategoria(categoria): ' + e.error.mensaje);
          // Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
          // return throwError(e);
          switch (e.status) {
            case 400:
              Swal.fire('Error al crear la categoria', e.error.errors.toString(), 'error');
              return throwError(e);
              break;
            case 500:
              Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
              return throwError(e);
              break;
            default:
              Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
              return throwError(e);
              break;
          }
        })
    );
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id}`, categoria, {headers: this.httpHeaders}).pipe(
      catchError(e => {
          //   console.error('categoria.service.updateCategoria(categoria): ' + e.error.mensaje);
          //   Swal.fire('Error al editar la categoria', e.error.mensaje, 'error');
          //   return throwError(e);
          switch (e.status) {
            case 400:
              Swal.fire('Error al editar la categoria', e.error.errors.toString(), 'error');
              return throwError(e);
              break;
            case 500:
              Swal.fire('Error al editar la categoria', e.error.mensaje, 'error');
              return throwError(e);
              break;
            default:
              Swal.fire('Error al editar la categoria', e.error.mensaje, 'error');
              return throwError(e);
              break;
          }
        })
    );
  }

  deletCategoria(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error('categoria.service.deletCategoria(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar la categoria', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
