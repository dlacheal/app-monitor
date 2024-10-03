import { Component } from '@angular/core';
import { Puesto } from './puesto';
import { PuestoService } from './puesto.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html'
})
export class PuestosComponent {

  puestos: Puesto[];
  paginadorPuesto: any;

  constructor(private puestoService: PuestoService,
              public authService: AuthService,
              private activateRoute: ActivatedRoute) {}

  ngOnInit(): void{

    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

    this.puestoService.getPuestosPage(page)
      .subscribe(response => {
      this.puestos = response.content as Puesto[];
      this.paginadorPuesto = response;
    });
  });
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
