import { Component } from '@angular/core';
import {Puesto} from "./puesto";
import {PuestoService} from "./puesto.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-puesto',
  templateUrl: './form-puesto.component.html'
})
export class FormPuestoComponent {

  public puesto: Puesto = new Puesto();
  public tituloFormPuesto = "Crear Puesto";

  constructor(private puestoService: PuestoService,
              private router: Router) {
  }

  ngOnInit(){}

  public createPuesto(): void{
    this.puestoService.createPuesto(this.puesto).subscribe(
      response => {
        this.router.navigate(['/puestos']);
        Swal.fire('Nuevo Puesto', `El puesto  ${this.puesto.descripcion} ha sido creado con éxito!`, 'success');
      }
    )
  }
}
