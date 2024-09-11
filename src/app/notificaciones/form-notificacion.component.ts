import { Component } from '@angular/core';
import {Notificacion} from "./notificacion";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificacionService} from "./notificacion.service";
import {Observer} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-notificacion',
  templateUrl: './form-notificacion.component.html'
})
export class FormNotificacionComponent {

  public notificacion: Notificacion = new Notificacion();
  public tituloFormNotificacion = "Formulario de Notificacion";

  public errores: string[];

  // public imagenSeleccionada: File;
  // public urlEndPointNotificacion: string;

  constructor(private notificacionService: NotificacionService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void{
    // this.cargarEpp();
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.notificacionService.getNotificacion(id).subscribe((notificacion) => this.notificacion = notificacion)
      }
    });
    //this.categoriaService.getCategorias().subscribe(categorias => this.categoriasEpp = categorias);

  }

  public createNotificacion(): void {
    const observer: Observer<Notificacion> = {
      next: (notificacion) => {
        this.router.navigate(['/notificaciones']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error(err.error.errors);
        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            //this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createNotificacion 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createNotificacion 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createNotificacion: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nueva Notificación', `La Notificación  ${this.notificacion.id} ha sido creada con éxito!`, 'success');
      }
    };
    this.notificacionService.createNotificacion(this.notificacion).subscribe(observer);
    // this.subirImagenNotificacion();
  }

  public updateNotificacion(): void {
    const observer: Observer<Notificacion> = {
      next: (notificacion) => {
        this.router.navigate(['/notificaciones']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateNotificacion 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateNotificacion 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateNotificacion: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Notificación actualizada', `Notificacion ${this.notificacion.id} ha sido actualizada con éxito!`, 'success');
      }
    };
    console.log("NotificacionActualizado: " + this.notificacion.id)
    console.log("NotificacionActualizado: " + this.notificacion.revisado)
    console.log("NotificacionActualizado: " + this.notificacion.enviado)
    console.log("NotificacionActualizado: " + this.notificacion.criticidad)
    console.log("NotificacionActualizado: " + this.notificacion.descripcion)

    this.notificacionService.updateNotificacion(this.notificacion).subscribe(observer);
  }

  // seleccionarImagenNotificacion(event) {
  //   this.imagenSeleccionada = event.target.files[0];
  //   if (this.imagenSeleccionada.type.indexOf('image') < 0){
  //     Swal.fire('Error seleccionar imagen', "El archivo debe ser de tipo imagen", 'error');
  //     this.imagenSeleccionada = null;
  //   }
  // }

  // subirImagenNotificacion() {
  //   if (!this.imagenSeleccionada) {
  //     Swal.fire('Error Upload', "Debe seleccionar una imagen", 'error');
  //   } else {
  //     this.notificacionService.subirFotograma(this.imagenSeleccionada, this.notificacion.id)
  //       .subscribe(notificacion => {
  //         this.notificacion = notificacion;
  //         Swal.fire('La imagen se ha subido completamente!', `La imagen se ha subido con éxito: ${this.notificacion.rutaFotograma}`, 'success');
  //       });
  //   }
  // }
}
