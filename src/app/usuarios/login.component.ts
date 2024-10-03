import { Component } from '@angular/core';
import {Usuario} from "./usuario";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  /** Atributos **/
  tituloLogin: String = 'Sing In';
  usuario: Usuario;

  /** Constructor **/
  constructor(private authService: AuthService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  /** Metodos **/
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      //Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/login']);
    }
  }

  login(): void{
    // console.log("login.component: " + this.usuario.username.toUpperCase());
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Username o password incorrectas!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response =>{
      //console.log("login: " + response);
      // let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      // console.log(payload);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token)

      let usuario = this.authService.usuario;

      console.log('login.codEmpleado: {}', usuario)
      this.router.navigate(['/empleados/ver/'+ usuario.codigoEmpleado.id]);
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if(err.status == 400){
        Swal.fire('Error Login', 'Usuario o password incorrectas!', 'error');
      }
    });
  }

}
