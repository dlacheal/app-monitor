import { Component } from '@angular/core';
import { Proyecto } from './proyecto';
import { ProyectoService } from './proyecto.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html'
})
export class ProyectosComponent {

  proyectos: Proyecto[];
  paginadorProyecto: any;

  constructor(private proyectoService: ProyectoService,
              private activateRoute: ActivatedRoute) {}

  ngOnInit(): void{
    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

    this.proyectoService.getProyectosPage(page)
      .subscribe(response => {
      this.proyectos = response.content as Proyecto[];
      this.paginadorProyecto = response;
    });
  });
}

  deleteProyecto(proyecto: Proyecto): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el propyecto  ${proyecto.nombreProyecto} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoService.deleteProyecto(proyecto.id).subscribe(
          response => {
            this.proyectos = this.proyectos.filter(pro => pro !== proyecto);
            Swal.fire(
              'Proyecto Eliminiado!',
              `El Proyecto ${proyecto.nombreProyecto}  ha sido eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
