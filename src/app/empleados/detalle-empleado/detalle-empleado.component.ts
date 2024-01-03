import { Component } from '@angular/core';
import {EppService} from "../../epps/epp.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {Empleado} from "../empleado";
import {EmpleadoService} from "../empleado.service";

@Component({
  selector: 'detalle-empleado',
  templateUrl: './detalle-empleado.component.html'
})
export class DetalleEmpleadoComponent {

  public empleado: Empleado;
  public tituloDetalleEmpleado = "Detalle del Empleado";
  private fotoSeleccionada: File;

  constructor(private empleadoService: EmpleadoService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(){
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');

      if(id){
        this.empleadoService.getEmpleado(id).subscribe(empleado => {
          this.empleado = empleado;
        });
      }
    });
  }

  seleccionarFotoEmpleado(event){
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFotoEpp(){
    this.empleadoService.subirFoto(this.fotoSeleccionada, this.empleado.id)
      .subscribe(empleado => {
        this.empleado = empleado;
        Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con éxito: ${this.empleado.rutaFoto}`, 'success');
      });
  }
}
