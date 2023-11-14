import { Component } from '@angular/core';
import { Proyecto } from './proyecto';
import { ProyectoService } from './proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html'
})
export class ProyectosComponent {

  proyectos: Proyecto[];

  constructor(private proyectoService: ProyectoService){}

  ngOnInit(){
    this.proyectoService.getProyectos().subscribe(
      proyectos => this.proyectos = proyectos
    )
  }

}
