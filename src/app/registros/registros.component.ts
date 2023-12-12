import { Component } from '@angular/core';
import { Registro } from './registro';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html'
})
export class RegistrosComponent {

  registros: Registro[];

  constructor(private registroService: RegistroService){}

  ngOnInit(){
    this.registroService.getRegistros().subscribe(
      registros => this.registros = registros
    );
  }

}
