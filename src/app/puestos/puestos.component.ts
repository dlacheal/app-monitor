import { Component } from '@angular/core';
import { Puesto } from './puesto';
import { PuestoService } from './puesto.service';
import {Proyecto} from "../proyectos/proyecto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html'
})
export class PuestosComponent {

  puestos: Puesto[];

  constructor(private puestoService: PuestoService){}

  ngOnInit(): void{
    this.puestoService.getPuestos().subscribe(
      puestos => this.puestos = puestos
    );
  }

  deletePuesto(puesto: Puesto): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el puesto  ${puesto.descripcion} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.puestoService.deletePuesto(puesto.id).subscribe(
          response => {
            this.puestos = this.puestos.filter(p => p !== puesto);
            Swal.fire(
              'Puesto Eliminiado!',
              `El Puesto ${puesto.descripcion}  ha sido eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
