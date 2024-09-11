import { Component } from '@angular/core';
import { Notificacion } from './notificacion';
import { NotificacionService } from './notificacion.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {Empleado} from "../empleados/empleado";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html'
})
export class NotificacionesComponent {

  notificaciones: Notificacion[];
  paginadorNotificacion: any;

  constructor(private notificacionService: NotificacionService,
              private activateRoute: ActivatedRoute){}

  ngOnInit(): void{
    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log("page:" + this.activateRoute);

      if (!page) {
        page = 0;
      }

      this.notificacionService.getNotificacionesPage(page)
        .subscribe(response => {
          this.notificaciones = response.content as Notificacion[];
          this.paginadorNotificacion = response;
        });
    });
  }

  deleteNotificacion(notificacion: Notificacion): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la notificación con fecha ${notificacion.fechaNotificacion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.notificacionService.deleteNotificacion(notificacion.id).subscribe(
          response => {
            this.notificaciones = this.notificaciones.filter(emp => emp !== notificacion);
            Swal.fire(
              'Empleado Eliminiado!',
              `La Notificación ${notificacion.id} con fecha ${notificacion.fechaNotificacion} ha sido eliminada con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
