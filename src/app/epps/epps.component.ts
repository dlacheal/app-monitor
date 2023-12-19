import { Component } from '@angular/core';
import { EppService } from './epp.service';
import { Epp } from './epp';
import {Empleado} from "../empleados/empleado";
import Swal from "sweetalert2";

@Component({
  selector: 'app-epps',
  templateUrl: './epps.component.html'
})
export class EppsComponent {

  epps: Epp[];

  constructor(private eppService: EppService){}

  ngOnInit(): void{
    this.eppService.getEpps().subscribe(
      epps => this.epps = epps
    );
  }

  deleteEpp(epp: Epp): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el epp  ${epp.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.eppService.deleteEpp(epp.id).subscribe(
          response => {
            this.epps = this.epps.filter(e => e !== epp);
            Swal.fire(
              'Epp Eliminiado!',
              `El Epp ${epp.nombre} ha sido eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
