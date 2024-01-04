import { Component } from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Empleado} from "../empleados/empleado";
import {EmpleadoService} from "../empleados/empleado.service";
import Swal from "sweetalert2";
import {Observer} from "rxjs";
import {Categoria} from "../categorias/categoria";

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent {

  public usuario: Usuario = new Usuario();
  public tituloFormUsuario = "Formulario Usuario";
  public empleados: Empleado[];

  constructor(private usuarioService: UsuarioService,
              private empleadoService: EmpleadoService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.empleadoService.getEmpleados().subscribe(empleados => this.empleados = empleados);
    this.cargarUsuarios();

  }

  cargarUsuarios(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.usuarioService.getPUsuario(id).subscribe((usuario) => this.usuario = usuario)
      }
    });
  }

  public createUsuarioDeprecated(): void{
    this.usuarioService.createUsuario(this.usuario).subscribe(
      response => {
        this.router.navigate(['/usuarios']);
        Swal.fire('Nuevo Usuario', `El usuario  ${this.usuario.username} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public createUsuario(): void {
    const observer: Observer<Usuario> = {
      next: (usuario) => {
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error(err.error.errors);
        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            //this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createUsuario 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createUsuario 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createUsuario: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nuevo Usuario', `El usuario  ${this.usuario.username} ha sido creado con éxito!`, 'success');
      }
    };
    this.usuarioService.createUsuario(this.usuario).subscribe(observer);
  }

  public updateUsuarioDeprecated(): void{
    this.usuarioService.updateusuario(this.usuario)
      .subscribe(usuario => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Usuario actualizado', `Usuario ${this.usuario.username} ha sido actualizado con éxito!`, 'success');
      });
  }

  public updateUsuario(): void {
    const observer: Observer<Usuario> = {
      next: (usuario) => {
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateUsuario 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateUsuario 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateUsuario: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Usuario actualizado', `Usuario ${this.usuario.username} ha sido actualizado con éxito!`, 'success');
      }
    };
    this.usuarioService.updateusuario(this.usuario).subscribe(observer);
  }

  compararUsuario(u1: Categoria, u2:Categoria): boolean{

    if(u1 === undefined && u2 === undefined){
      return true;
    }
    return u1 === null || u2 === null || u1 === undefined || u2 === undefined? false: u1.id === u2.id;
  }

}
