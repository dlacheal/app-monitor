import { Component } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent {

  empleados: Empleado[];
  paginadorEmpleado: any

  constructor(private empleadoService: EmpleadoService,
              private activateRoute: ActivatedRoute){}

  ngOnInit(): void{

    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.empleadoService.getEmpleadosPage(page)
        .subscribe(response => {
          this.empleados = response.content as Empleado[];
          this.paginadorEmpleado = response;
        });
    });
  }

  deleteEmpleado(empleado: Empleado): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el empleado  ${empleado.codigoPersona.nombres} ${empleado.codigoPersona.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.deleEmpleado(empleado.id).subscribe(
          response => {
            this.empleados = this.empleados.filter(emp => emp !== empleado);
            Swal.fire(
              'Empleado Eliminiado!',
              `El Empleado ${empleado.codigoPersona.nombres} ${empleado.codigoPersona.apellidos} ha sido eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
