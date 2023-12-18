import { Component } from '@angular/core';
import {Registro} from "./registro";
import {RegistroService} from "./registro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Empleado} from "../empleados/empleado";
import {EmpleadoService} from "../empleados/empleado.service";
import {Proyecto} from "../proyectos/proyecto";
import {ProyectoService} from "../proyectos/proyecto.service";
import Swal from "sweetalert2";

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

  public createRegistro(): void{
    this.registroService.createRegistro(this.registro).subscribe(
      response => {
        this.router.navigate(['/registros']);
        Swal.fire('Nuevo Registro', `El registro  ${this.registro.numeroRegistro} ha sido creado con éxito!`, 'success');
      }
    )
  }

}
