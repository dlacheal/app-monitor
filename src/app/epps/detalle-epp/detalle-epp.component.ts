import {Component} from '@angular/core';
import {Epp} from "../epp";
import {EppService} from "../epp.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'detalle-epp',
  templateUrl: './detalle-epp.component.html'
})
export class DetalleEppComponent {

  public epp: Epp;
  public tituloDetalleEpp = "Detalle del Epp";
  public imagenSeleccionada: File;

  constructor(private eppService: EppService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');

      if (id) {
        this.eppService.getEpp(id).subscribe(epp => {
          this.epp = epp;
        });
      }
    });
  }

  seleccionarImagenEpp(event) {
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error seleccionar imagen', "El archivo debe ser de tipo imagen", 'error');
      this.imagenSeleccionada = null;
    }
  }

  subirImagenEpp() {
    if (!this.imagenSeleccionada) {
      Swal.fire('Error Upload', "Debe seleccionar una imagen", 'error');
    } else {
      this.eppService.subirImagen(this.imagenSeleccionada, this.epp.id)
        .subscribe(epp => {
          this.epp = epp;
          Swal.fire('La imagen se ha subido completamente!', `La imagen se ha subido con éxito: ${this.epp.rutaImagen}`, 'success');
        });
    }
  }
}
