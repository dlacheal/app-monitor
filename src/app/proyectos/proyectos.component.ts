import { Component } from '@angular/core';
import { Proyecto } from './proyecto';
import { ProyectoService } from './proyecto.service';
import {Empleado} from "../empleados/empleado";
import Swal from "sweetalert2";

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html'
})
export class ProyectosComponent {

  proyectos: Proyecto[];

  constructor(private proyectoService: ProyectoService){}

  ngOnInit(): void{
    this.proyectoService.getProyectos().subscribe(
      proyectos => this.proyectos = proyectos
    )
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
