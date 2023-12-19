import { Component } from '@angular/core';
import { Registro } from './registro';
import { RegistroService } from './registro.service';
import {Proyecto} from "../proyectos/proyecto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html'
})
export class RegistrosComponent {

  registros: Registro[];

  constructor(private registroService: RegistroService){}

  ngOnInit(): void{
    this.registroService.getRegistros().subscribe(
      registros => this.registros = registros
    );
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
