import { Injectable } from '@angular/core';
import {Usuario} from "./usuario";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Empleado} from "../empleados/empleado";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Atributos **/
  private _usuario: Usuario = new Usuario();
  private _token: string;

  /** Constructor **/
  constructor(private http: HttpClient) { }

  /** Metodos **/

  public get usuario(): Usuario{

    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      console.log("AuthService.usuario(): " + sessionStorage.getItem('usuario'));
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;

  }

  login(usuario: Usuario): Observable<any>{
    // const urlEndPoint: string = "https://lrsistemas.net/oauth/token";
    // const urlEndpoint = 'http://192.168.0.12:8181/oauth/token';
    const urlEndpoint = 'http://192.168.18.94:8081/oauth/token';


    const credenciales = btoa('angularappmonitor' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    console.log('auth.service.login: ' + params.toString());

    return this.http.post(urlEndpoint, params.toString(), {headers: httpHeaders});

  }

  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);
    console.log('auth.service.guardarUsuario_1: ' + payload.user_name);
    this._usuario = new Usuario();
    console.log('auth.service.guardarUsuario_2: ');
    this._usuario.username = payload.user_name;
    console.log('auth.service.guardarUsuario_3: ');
    this._usuario.authorities = payload.authorities;
    console.log('auth.service.guardarUsuario_4: ');
    if(this._usuario.codigoEmpleado == null){
      console.log('auth.service.guardarUsuario_5: ');
      this._usuario.codigoEmpleado = new Empleado();
      console.log('auth.service.guardarUsuario_6: ');
      this._usuario.codigoEmpleado.id = payload.id_empleado;
      this._usuario.codigoEmpleado.codigoPersona.email = payload.email_empleado;
      console.log('auth.service.guardarUsuario_7: ');
    }else{
      console.log('auth.service.guardarUsuario_8: ');
      this._usuario.codigoEmpleado.id = payload.id_empleado;
      this._usuario.codigoEmpleado.codigoPersona.email = payload.email_empleado;
    }


    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);

  }

  obtenerDatosToken(accessToken: string): any{
    if(accessToken != null){
      // console.log('auth.service.obtenerDatosToken: ' + JSON.parse(atob(accessToken.split(".")[1])));
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean{
    if(this.usuario.authorities.includes(role)){
      return true;
    }
    return false;
  }

  logout(): void{
    this._token = null;
    this._usuario = null;
    //Elimina toda la informacion
    sessionStorage.clear();

    //Elimina la informacion segun lo requeramos
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");

  }
}
