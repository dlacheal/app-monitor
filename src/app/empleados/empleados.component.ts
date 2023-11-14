import { Component } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent {
  
  empleados: Empleado[];

  constructor(private empleadoService: EmpleadoService){}

  ngOnInit(){
    this.empleadoService.getEpps().subscribe(
      empleados => this.empleados = empleados
    );
  }

}
