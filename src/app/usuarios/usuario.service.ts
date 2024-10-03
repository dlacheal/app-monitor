import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /** Atributos */
  private urlEndPoint: string = '/api/usuarios';
  private httpHeaders =  new HttpHeaders({'Content-Type': 'application/json'});

  /** Constructor */
  constructor(private http:HttpClient,
              private router: Router /*,
              private authService: AuthService */) { }

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
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    //ACCESO PROHIBIDO (FORBIDDEN - (credenciales validas, rol no permitido)
    if(e.status==403){
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning')
      this.router.navigate(['/usuarios']);
      return true;
    }
    return false;
  }
*/

  /**
   * Obtiene una lista de usuarios desde un endpoint REST y convierte ciertos campos
   * de los objetos de usuario (nombre de usuario, nombres y apellidos) a mayúsculas.
   *
   * Este método realiza una solicitud HTTP GET para obtener los datos de los usuarios desde el
   * backend, y luego transforma los campos `username`, `nombres` y `apellidos` de cada usuario
   * a mayúsculas.
   *
   * @returns {Observable<Usuario[]>} Un observable que emite una lista de usuarios, con algunos
   * de sus atributos modificados a mayúsculas.
   *
   * @example
   * // Llamar a este método para obtener usuarios:
   * this.usuarioService.getUsuarios().subscribe(usuarios => {
   *   console.log(usuarios);
   * });
   */
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
    map( response => {
      let usuarios = response as Usuario[];

      return usuarios.map( usuario => {
        usuario.username = usuario.username.toUpperCase();
        usuario.codigoEmpleado.codigoPersona.nombres = usuario.codigoEmpleado.codigoPersona.nombres.toUpperCase();
        usuario.codigoEmpleado.codigoPersona.apellidos = usuario.codigoEmpleado.codigoPersona.apellidos.toUpperCase();
        return usuario;
      });
    })
    );
  }

  /**
   * Obtiene una página de usuarios desde un endpoint REST y convierte ciertos campos
   * de los objetos de usuario (nombre de usuario, nombres y apellidos) a mayúsculas.
   *
   * Este método realiza una solicitud HTTP GET paginada al backend para obtener los datos
   * de los usuarios. La página solicitada se pasa como parámetro. Luego transforma
   * los campos `username`, `nombres` y `apellidos` de cada usuario a mayúsculas antes de
   * devolver la respuesta completa.
   *
   * @param {number} page - El número de la página que se desea obtener de los usuarios.
   * @returns {Observable<any>} Un observable que emite la respuesta completa del servidor
   * con la página de usuarios. Los usuarios dentro de la respuesta tienen ciertos campos
   * en mayúsculas.
   *
   * @example
   * // Llamar a este método para obtener una página específica de usuarios:
   * this.usuarioService.getUsuariosPage(1).subscribe(response => {
   *   console.log(response);
   * });
   */
  getUsuariosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Usuario[]).map( usuario => {
          usuario.username = usuario.username.toUpperCase();
          usuario.codigoEmpleado.codigoPersona.nombres = usuario.codigoEmpleado.codigoPersona.nombres.toUpperCase();
          usuario.codigoEmpleado.codigoPersona.apellidos = usuario.codigoEmpleado.codigoPersona.apellidos.toUpperCase();
          return usuario;
        });
        return response;
      })
    );
  }

  /**
   * Obtiene los datos de un usuario específico basado en su ID desde un endpoint REST.
   *
   * Este método realiza una solicitud HTTP GET al backend para obtener los datos de un usuario
   * identificado por su `id`. En caso de que ocurra un error (excepto un error 401 de no autorizado),
   * redirige al usuario a la página de lista de usuarios y muestra un mensaje de error en la consola.
   *
   * También captura y maneja los errores provenientes del servidor, y los envía utilizando `throwError`
   * para ser manejados por los observadores suscritos a este observable.
   *
   * @param {number|string} id - El ID del usuario que se desea obtener.
   * @returns {Observable<Usuario>} Un observable que emite los datos del usuario solicitado.
   * Si ocurre un error, se maneja con un bloque de `catchError`.
   *
   * @example
   * // Llamar a este método para obtener un usuario por su ID:
   * this.usuarioService.getUsuario(1).subscribe(usuario => {
   *   console.log(usuario);
   * }, error => {
   *   console.error('Error al obtener usuario', error);
   * });
   */
  getUsuario(id): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/usuarios'])
          console.error(e.error.mensaje);
        }

        if (e.error.mensaje) {
          console.error('usuario.service.getCategoria(id): '+ e.error.mensaje);
        }
        /*
        this.router.navigate(['/usuarios'])
        console.error('usuario.service.getCategoria(id): ' + e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
         */
        return throwError(e);
      })
    );
  }

  /**
   * Crea un nuevo usuario en el backend utilizando una solicitud HTTP POST.
   *
   * Este método realiza una solicitud HTTP POST al endpoint correspondiente para crear un usuario.
   * En caso de que ocurra un error, maneja las respuestas de error basadas en los códigos de estado HTTP (400, 500, etc.)
   * y arroja el error capturado para que sea manejado por los observadores suscritos.
   *
   * @param {Usuario} usuario - El objeto usuario que contiene la información del nuevo usuario que se desea crear.
   * @returns {Observable<Usuario>} Un observable que emite el objeto del usuario creado si la creación es exitosa.
   * En caso de error, maneja el código de estado y retorna el error mediante `throwError`.
   *
   * @example
   * // Llamar a este método para crear un usuario:
   * this.usuarioService.createUsuario(nuevoUsuario).subscribe(
   *   usuario => {
   *     console.log('Usuario creado:', usuario);
   *   },
   *   error => {
   *     console.error('Error al crear el usuario', error);
   *   }
   * );
   */
  createUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('usuario.service.createEmpleado(usuario): ' + e.error.mensaje);
        // Swal.fire('Error al crear el usuario', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            //Swal.fire('Error al crear la categoria', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            //Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            //Swal.fire('Error al crear la categoria', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  /**
   * Actualiza un usuario existente en el backend utilizando una solicitud HTTP PUT.
   *
   * Este método envía una solicitud HTTP PUT al endpoint correspondiente para actualizar la información
   * de un usuario existente. Si ocurre un error, se maneja el código de estado HTTP (400, 500, etc.) y
   * se arroja el error capturado para que los suscriptores lo manejen adecuadamente.
   *
   * @param {Usuario} usuario - El objeto usuario que contiene la información actualizada del usuario a modificar.
   * @returns {Observable<Usuario>} Un observable que emite el objeto del usuario actualizado si la operación es exitosa.
   * En caso de error, se maneja el error y se devuelve mediante `throwError`.
   *
   * @example
   * // Llamar a este método para actualizar un usuario:
   * this.usuarioService.updateUsuario(usuarioExistente).subscribe(
   *   usuarioActualizado => {
   *     console.log('Usuario actualizado:', usuarioActualizado);
   *   },
   *   error => {
   *     console.error('Error al actualizar el usuario', error);
   *   }
   * );
   */
  updateusuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        // console.error('usuario.service.updateusuario(usuario): ' + e.error.mensaje);
        // Swal.fire('Error al editar el usuario', e.error.mensaje, 'error');
        // return throwError(e);
        switch (e.status) {
          case 400:
            //Swal.fire('Error al editar el usuario', e.error.errors.toString(), 'error');
            return throwError(e);
            break;
          case 500:
            //Swal.fire('Error al editar el usuario', e.error.mensaje, 'error');
            return throwError(e);
            break;
          default:
            //Swal.fire('Error al editar el usuario', e.error.mensaje, 'error');
            return throwError(e);
            break;
        }
      })
    );
  }

  /**
   * Elimina un usuario existente del backend utilizando una solicitud HTTP DELETE.
   *
   * Este método envía una solicitud HTTP DELETE al endpoint correspondiente para eliminar un usuario
   * basado en su identificador único. Si ocurre un error durante el proceso, se captura y se maneja
   * el mensaje de error para su posterior análisis.
   *
   * @param {number} id - El identificador único del usuario que se desea eliminar.
   * @returns {Observable<Usuario>} Un observable que emite el objeto del usuario eliminado si la operación es exitosa.
   * En caso de error, se maneja el error y se devuelve mediante `throwError`.
   *
   * @example
   * // Llamar a este método para eliminar un usuario:
   * this.usuarioService.deleteUsuario(usuarioId).subscribe(
   *   usuarioEliminado => {
   *     console.log('Usuario eliminado:', usuarioEliminado);
   *   },
   *   error => {
   *     console.error('Error al eliminar el usuario', error);
   *   }
   * );
   */
  deleteUsuario(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error('usuario.service.deleteUsuario(id): '+ e.error.mensaje);
        }
        //Swal.fire('Error al eliminar el usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
