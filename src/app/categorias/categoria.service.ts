import {Injectable} from '@angular/core';
import {Categoria} from './categoria';
import {map, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../usuarios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  /** Atributos */
  private urlEndPoint: string = '/api/categorias';

  //private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  /** Constructor */
  constructor(private http: HttpClient,
              private router: Router,
              public authService: AuthService) {
  }

  /** Metodos */
  /**
   * Comentamos agregarAuthorizationHeader
   * y en los demas metodos que lo usen
   * porque el token.interceptor ya hace el
   * trabajo de agregar el token a la cabecera
    */
/*
   private agregarAuthorizationHeader(){
     let token = this.authService.token;
     if(token != null){
       return this.httpHeaders.append('Authorization', 'Bearer' + token);
     }
     return this.httpHeaders;
   }
*/

  /**
   * Comentamos isNoAutorizado(e)
   * y en los demas metodos que lo usen
   * porque el auth.interceptor ya hace el
   * trabajo de agregar el token a la cabecera
   */
/*
  private isNoAutorizado(e): boolean{
    //NO AUTORIZADO (credenciales invalidas)
    if(e.status == 401){
      console.log("Error in isNoAutorizado: " + e.status)
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      //Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes autorización a este recurso!`, 'warning')
      this.router.navigate(['/login']);
      return true;
    }

    //ACCESO PROHIBIDO (FORBIDDEN - (credenciales validas, rol no permitido)
    if(e.status==403){
      console.log("Error in isNoAutorizado: " + e.status)
      Swal.fire('Recurso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning')
      this.router.navigate([`/epps`]);
      return true;
    }
    return false;
  }
*/

  getCategorias(): Observable<Categoria[]> {
    //return this.http.get<Categoria[]>(this.urlEndPoint, { headers: this.agregarAuthorizationHeader() }).pipe(
    return this.http.get<Categoria[]>(this.urlEndPoint).pipe(
      catchError(e => {
        switch (e.status) {
          case 401:
            //Swal.fire('Error al crear la categoria', e.error.errors.toString(), 'error');
            return throwError(e);
          case 403:
            //Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
            return throwError(e);
          default:
            return throwError(e); // Return the error for other status codes
        }
      }),
      map(response => {
        let categorias = response as Categoria[];

        return categorias.map(categoria => {
          categoria.descripcion = categoria.descripcion.toUpperCase();
          return categoria;
        });
      })
    );
  }

  getCategoriasPage(page: number): Observable<any> {
    //return this.http.get(this.urlEndPoint + '/page/' + page, { headers: this.agregarAuthorizationHeader() }).pipe(
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      /*
      catchError(e => {
        console.log("Error: " + e.status)
        switch (e.status) {
          case 401:
            Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes autorización a este recurso!`, 'warning')
            return throwError(e);
          case 403:
            Swal.fire('Recurso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning')
            return throwError(e);
          default:
            return throwError(e); // Return the error for other status codes
        }
      }),
      */
      map((response: any) => {
        (response.content as Categoria[]).map(categoria => {
          categoria.descripcion = categoria.descripcion.toUpperCase();
          return categoria;
        });
        return response;
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
    //return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders}).pipe(
    return this.http.post<Categoria>(this.urlEndPoint, categoria).pipe(
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
    //return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id}`, categoria, {headers: this.httpHeaders}).pipe(
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id}`, categoria).pipe(
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
    //return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.error('categoria.service.deletCategoria(id): ' + e.error.mensaje);
        Swal.fire('Error al eliminar la categoria', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
