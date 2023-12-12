import { Component } from '@angular/core';
import {Proyecto} from "./proyecto";
import {ProyectoService} from "./proyecto.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html'
})
export class FormProyectoComponent {

  public proyecto: Proyecto = new Proyecto();
  public tituloFromProyecto = "Crear Proyecto";

  constructor(private proyectoService: ProyectoService,
              private router: Router) {
  }

  ngOnInit(){}

  public createProyecto(): void{
    this.proyectoService.createProyecto(this.proyecto).subscribe(
      response => {
        this.router.navigate(['/proyectos']);
        Swal.fire('Nuevo Proyecto', `El proyecto  ${this.proyecto.nombreProyecto} ha sido creado con éxito!`, 'success');
      }
    )
  }

}
