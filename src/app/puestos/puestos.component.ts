import { Component } from '@angular/core';
import { Puesto } from './puesto';
import { PuestoService } from './puesto.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html'
})
export class PuestosComponent {

  puestos: Puesto[];

  constructor(private puestoService: PuestoService){}

  ngOnInit(){
    this.puestoService.getPuestos().subscribe(
      puestos => this.puestos = puestos
    );
  }

}
