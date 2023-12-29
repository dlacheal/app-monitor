import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {

  usuarios: Usuario[];
  paginadorUsuario: any;

  constructor(private usuarioService: UsuarioService,
              private activateRoute: ActivatedRoute) {}


  ngOnInit(): void{

    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

    this.usuarioService.getUsuariosPage(page)
      .subscribe(response => {
      this.usuarios = response.content as Usuario[];
      this.paginadorUsuario = response;
    });
  });
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
