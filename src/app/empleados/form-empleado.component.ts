import { Component } from '@angular/core';
import {Empleado} from "./empleado";
import {EmpleadoService} from "./empleado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Puesto} from "../puestos/puesto";
import {PuestoService} from "../puestos/puesto.service";
import {PersonaService} from "../personas/persona.service";
import {Persona} from "../personas/persona";
import Swal from "sweetalert2";
import {Observer} from "rxjs";

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html'
})
export class FormEmpleadoComponent {

  public empleado: Empleado = new Empleado();
  public tituloFormEmpleado = "Crear Empleado";
  public puestos: Puesto[];
  public personas: Persona[];

  constructor(private empleadoService: EmpleadoService,
              private puestoService: PuestoService,
              private personaService: PersonaService,
              private router: Router,
              private activateRoute: ActivatedRoute){
  }

  ngOnInit(): void{
    this.puestoService.getPuestos().subscribe(
      puestos => this.puestos = puestos
    );

    // this.activateRoute.paramMap.subscribe(params => {
    //   let id = +params.get('id');
    //   if(id){
    //     this.empleadoService.getEmpleado(id)
    //       .subscribe((empleado) => this.empleado = empleado)
    //   }
    // });

    this.personaService.getPersonas().subscribe(personas => this.personas = personas);

    this.cargarEmpleado();
  }

  cargarEmpleado(): void{
    this.activateRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.empleadoService.getEmpleado(id)
          .subscribe((empleado) => this.empleado = empleado)
      }
    });
  }

  public createEmpleadoDeprecated(): void{
    this.empleadoService.createEmpleado(this.empleado)
      .subscribe(
      response => {
        this.router.navigate(['/empleados']);
        Swal.fire('Nuevo Empleado', `El empleado  ${this.empleado.codigoPersona.nombres} ${this.empleado.codigoPersona.apellidos}  ha sido creado con éxito!`, 'success');
      }
    )
  }

  public createEmpleado(): void {
    const observer: Observer<Empleado> = {
      next: (empleado) => {
        this.router.navigate(['/empleados']);
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
            console.error("Mensaje error createEmpleado 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createEmpleado 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createEmpleado: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nuevo Empleado', `El empleado  ${this.empleado.codigoPersona.nombres} ${this.empleado.codigoPersona.apellidos}  ha sido creado con éxito!`, 'success');
      }
    };
    this.empleadoService.createEmpleado(this.empleado).subscribe(observer);
  }

  public updateEmpleadoDeprecated(): void{
    this.empleadoService.updateEmpleado(this.empleado)
      .subscribe(empleado => {
        this.router.navigate(['/empleados'])
        Swal.fire('Empleado actualizado', `Empleado ${this.empleado.codigoPersona.nombres} ha sido actualizado con éxito!`, 'success');
      });
  }

  public updateEmpleado(): void {
    const observer: Observer<Empleado> = {
      next: (empleado) => {
        this.router.navigate(['/empleados']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateEmpleado 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateEmpleado 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateEmpleado: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Empleado actualizado', `Empleado ${this.empleado.codigoPersona.nombres} ha sido actualizado con éxito!`, 'success');
      }
    };
    this.empleadoService.updateEmpleado(this.empleado).subscribe(observer);
  }


}
