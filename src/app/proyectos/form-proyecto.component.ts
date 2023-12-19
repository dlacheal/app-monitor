import { Component } from '@angular/core';
import {Proyecto} from "./proyecto";
import {ProyectoService} from "./proyecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html'
})
export class FormProyectoComponent {

  public proyecto: Proyecto = new Proyecto();
  public tituloFromProyecto = "Crear Proyecto";

  constructor(private proyectoService: ProyectoService,
              private router: Router,
              private activateRoute: ActivatedRoute){
  }

  ngOnInit(): void{
    this.cargarProyecto();
  }

  cargarProyecto(): void{
    this.activateRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.proyectoService.getProyecto(id).subscribe((proyecto) => this.proyecto = proyecto)
      }
    });
  }

  public createProyecto(): void{
    this.proyectoService.createProyecto(this.proyecto).subscribe(
      response => {
        this.router.navigate(['/proyectos']);
        Swal.fire('Nuevo Proyecto', `El proyecto  ${this.proyecto.nombreProyecto} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public updateProyecto(): void{
    this.proyectoService.updateProyecto(this.proyecto)
      .subscribe(proyecto => {
        this.router.navigate(['/proyectos'])
        Swal.fire('Proyecto actualizado', `Proyecto ${this.proyecto.nombreProyecto} ha sido actualizado con éxito!`, 'success');
      });
  }

}
