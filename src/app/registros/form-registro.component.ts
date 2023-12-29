import { Component } from '@angular/core';
import {Registro} from "./registro";
import {RegistroService} from "./registro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Empleado} from "../empleados/empleado";
import {EmpleadoService} from "../empleados/empleado.service";
import {Proyecto} from "../proyectos/proyecto";
import {ProyectoService} from "../proyectos/proyecto.service";
import Swal from "sweetalert2";
import {Observer} from "rxjs";
import {Categoria} from "../categorias/categoria";

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html'
})
export class FormRegistroComponent {

  public registro: Registro = new Registro();
  public tituloFormRegistro = "Crear Registro";
  public empleados: Empleado[];
  public proyectos: Proyecto[];

  constructor(private registroService: RegistroService,
              private empleadoService: EmpleadoService,
              private proyectoService: ProyectoService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );

    this.proyectoService.getProyectos().subscribe(
      proyectos => this.proyectos = proyectos
    );

    this.cargarRegistro();

  }

  cargarRegistro(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.registroService.getRegistro(id).subscribe((registro) => this.registro = registro)
      }
    });
  }

  public createRegistroDeprecated(): void{
    this.registroService.createRegistro(this.registro).subscribe(
      response => {
        this.router.navigate(['/registros']);
        Swal.fire('Nuevo Registro', `El registro  ${this.registro.numeroRegistro} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public createRegistro(): void {
    const observer: Observer<Registro> = {
      next: (registro) => {
        this.router.navigate(['/registros']);
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
            console.error("Mensaje error createRegistro 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createRegistro 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createRegistro: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nuevo Registro', `El registro  ${this.registro.numeroRegistro} ha sido creado con éxito!`, 'success');
      }
    };
    this.registroService.createRegistro(this.registro).subscribe(observer);
  }

  public updateRegistroDeprecated(): void{
    this.registroService.updateRegistro(this.registro)
      .subscribe(registro => {
        this.router.navigate(['/registros'])
        Swal.fire('Registro actualizado', `Registro ${this.registro.numeroRegistro} ha sido actualizado con éxito!`, 'success');
      });
  }

  public updateRegistro(): void {
    const observer: Observer<Registro> = {
      next: (registros) => {
        this.router.navigate(['/registros']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateCategoria 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateCategoria 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateCategoria: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Registro actualizado', `Registro ${this.registro.numeroRegistro} ha sido actualizado con éxito!`, 'success');
      }
    };
    this.registroService.updateRegistro(this.registro).subscribe(observer);
  }

  compararEmpleado(e1: Empleado, e2:Empleado): boolean{

    if(e1 === undefined && e2 === undefined){
      return true;
    }
    return e1 === null || e2 === null || e1 === undefined || e2 === undefined? false: e1.id === e2.id;
  }

  compararProyecto(p1: Empleado, p2:Empleado): boolean{

    if(p1 === undefined && p2 === undefined){
      return true;
    }
    return p1 === null || p2 === null || p1 === undefined || p2 === undefined? false: p1.id === p2.id;
  }

}
