import { Component } from '@angular/core';
import {Proyecto} from "./proyecto";
import {ProyectoService} from "./proyecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Observer} from "rxjs";

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html'
})
export class FormProyectoComponent {

  public proyecto: Proyecto = new Proyecto();
  public tituloFromProyecto = "Formulario Proyecto";

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

  public createProyectoDeprecated(): void{
    this.proyectoService.createProyecto(this.proyecto).subscribe(
      response => {
        this.router.navigate(['/proyectos']);
        Swal.fire('Nuevo Proyecto', `El proyecto  ${this.proyecto.nombreProyecto} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public createProyecto(): void {
    const observer: Observer<Proyecto> = {
      next: (proyecto) => {
        this.router.navigate(['/proyectos']);
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
            console.error("Mensaje error createCategoria 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createCategoria 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createCategoria: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nuevo Proyecto', `El proyecto  ${this.proyecto.nombreProyecto} ha sido creado con éxito!`, 'success');
      }
    };
    this.proyectoService.createProyecto(this.proyecto).subscribe(observer);
  }

  public updateProyectoDeprecated(): void{
    this.proyectoService.updateProyecto(this.proyecto)
      .subscribe(proyecto => {
        this.router.navigate(['/proyectos'])
        Swal.fire('Proyecto actualizado', `Proyecto ${this.proyecto.nombreProyecto} ha sido actualizado con éxito!`, 'success');
      });
  }

  public updateProyecto(): void {
    const observer: Observer<Proyecto> = {
      next: (proyecto) => {
        this.router.navigate(['/proyectos']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateProyecto 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateProyecto 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateProyecto: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Proyecto actualizado', `Proyecto ${this.proyecto.nombreProyecto} ha sido actualizado con éxito!`, 'success');
      }
    };
    this.proyectoService.updateProyecto(this.proyecto).subscribe(observer);
  }

}
