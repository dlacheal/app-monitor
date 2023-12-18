import { Component } from '@angular/core';
import {Empleado} from "./empleado";
import {EmpleadoService} from "./empleado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Puesto} from "../puestos/puesto";
import {PuestoService} from "../puestos/puesto.service";
import {PersonaService} from "../personas/persona.service";
import {Persona} from "../personas/persona";
import Swal from "sweetalert2";

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

    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.empleadoService.getEmpleado(id)
          .subscribe((empleado) => this.empleado = empleado)
      }
    });

    this.personaService.getPersonas().subscribe(personas => this.personas = personas);
    // this.cargarEmpleado();
  }

  // cargarEmpleado(): void{
  //   this.activateRoute.params.subscribe(params =>{
  //     let id = params['id'];
  //     if(id){
  //       this.empleadoService.getEmpleado(id)
  //         .subscribe((empleado) => this.empleado = empleado)
  //     }
  //   });
  // }

  public createEmpleado(): void{
    this.empleadoService.createEmpleado(this.empleado)
      .subscribe(
      response => {
        this.router.navigate(['/empleados']);
        Swal.fire('Nuevo Empleado', `El empleado  ${this.empleado.codigoPersona.nombres} ${this.empleado.codigoPersona.apellidos}  ha sido creado con éxito!`, 'success');
      }
    )
  }

}
