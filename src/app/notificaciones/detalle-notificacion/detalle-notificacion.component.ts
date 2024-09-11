import { Component } from '@angular/core';
import {Notificacion} from "../notificacion";
import {EmpleadoService} from "../../empleados/empleado.service";
import {RegistroService} from "../../registros/registro.service";
import {ActivatedRoute} from "@angular/router";
import {NotificacionService} from "../notificacion.service";
import Swal from "sweetalert2";

@Component({
  selector: 'detalle-notificacion',
  templateUrl: './detalle-notificacion.component.html',
  styleUrls: ['./detalle-notificacion.component.css']
})
export class DetalleNotificacionComponent {

  public notificacion: Notificacion = new Notificacion();
  public tituloDetalleNotificacion = "Detalle de la Notificación";
  public imagenSeleccionada: File;
  public urlEndPointNotificacion: string;

  constructor(private notificacionService: NotificacionService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');

      if (id) {
        this.notificacionService.getNotificacion(id).subscribe(notificacion => {
          this.notificacion = notificacion;
        });
      }
    });
    this.urlEndPointNotificacion = this.notificacionService.urlEndPoint;
  }

  seleccionarImagenNotificacion(event) {
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error seleccionar imagen', "El archivo debe ser de tipo imagen", 'error');
      this.imagenSeleccionada = null;
    }
  }

  subirImagenNotificacion() {
    if (!this.imagenSeleccionada) {
      Swal.fire('Error Upload', "Debe seleccionar una imagen", 'error');
    } else {
      this.notificacionService.subirFotograma(this.imagenSeleccionada, this.notificacion.id)
        .subscribe(notificacion => {
          this.notificacion = notificacion;
          Swal.fire('La imagen se ha subido completamente!', `La imagen se ha subido con éxito: ${this.notificacion.rutaFotograma}`, 'success');
        });
    }
  }


}
