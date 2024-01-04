import {Component} from '@angular/core';
import {EppService} from "../../epps/epp.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {Empleado} from "../empleado";
import {EmpleadoService} from "../empleado.service";
import {Registro} from "../../registros/registro";
import {RegistroService} from "../../registros/registro.service";

@Component({
  selector: 'detalle-empleado',
  templateUrl: './detalle-empleado.component.html'
})
export class DetalleEmpleadoComponent {

  public empleado: Empleado;
  public tituloDetalleEmpleado = "Detalle del Empleado";
  public fotoSeleccionada: File;
  public registrosEmpleado: Registro[];
  public urlEndPointEmpleado: string;

  constructor(private empleadoService: EmpleadoService,
              private registroService: RegistroService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');

      if (id) {
        this.empleadoService.getEmpleado(id).subscribe(empleado => {
          this.empleado = empleado;
          if(this.empleado.registros.length > 0){
            this.registrosEmpleado = this.empleado.registros
          }
        });
      }
    });
    this.urlEndPointEmpleado = this.empleadoService.urlEndPoint;
  }

  seleccionarFotoEmpleado(event) {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar foto', "El archivo debe ser de tipo imagen", 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFotoEpp() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload', "Debe seleccionar una foto", 'error');
    } else {
      this.empleadoService.subirFoto(this.fotoSeleccionada, this.empleado.id)
        .subscribe(empleado => {
          this.empleado = empleado;
          Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con éxito: ${this.empleado.rutaFoto}`, 'success');
        });
    }
  }

  deleteRegistroEmpleado(registro: Registro): void{
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
            this.registrosEmpleado = this.registrosEmpleado.filter(reg => reg !== registro);
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
