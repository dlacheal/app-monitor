import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import {Proyecto} from "../proyectos/proyecto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void{
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  deleteUsuario(usuario: Usuario): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el usuario  ${usuario.username} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(usr => usr!== usuario);
            Swal.fire(
              'Usuario Eliminiado!',
              `El Usuario ${usuario.username}  ha sido eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
