import { Component } from '@angular/core';
import { Registro } from './registro';
import { RegistroService } from './registro.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html'
})
export class RegistrosComponent {

  registros: Registro[];
  paginadorRegistro: any;

  constructor(private registroService: RegistroService,
              private activateRoute: ActivatedRoute) {}

  ngOnInit(): void{

    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

    this.registroService.getRegistrosPage(page)
      .subscribe(response => {
      this.registros = response.content as Registro[];
      this.paginadorRegistro = response;
    });
  });
}


  deleteRegistro(registro: Registro): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el registro  ${registro.numeroRegistro} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.registroService.deleteRegistro(registro.id).subscribe(
          response => {
            this.registros = this.registros.filter(reg => reg !== registro);
            Swal.fire(
              'Registro Eliminiado!',
              `El Registro ${registro.numeroRegistro}  ha sido eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }
}
