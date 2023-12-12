import { Component } from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";
import {Router} from "@angular/router";
import {Empleado} from "../empleados/empleado";
import {EmpleadoService} from "../empleados/empleado.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent {

  public usuario: Usuario = new Usuario();
  public tituloFormUsuario = "Crear Usuario";
  public empleados: Empleado[];

  constructor(private usuarioService: UsuarioService,
              private empleadoService: EmpleadoService,
              private router: Router) {
  }

  ngOnInit(): void{
    this.empleadoService.getEmpleados().subscribe(empleados => this.empleados = empleados);
  }

  public createUsuario(): void{
    this.usuarioService.createUsuario(this.usuario).subscribe(
      response => {
        this.router.navigate(['/usuarios']);
        Swal.fire('Nuevo Usuario', `El usuario  ${this.usuario.username} ha sido creado con éxito!`, 'success');
      }
    )
  }

}
