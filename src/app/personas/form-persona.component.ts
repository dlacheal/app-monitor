import { Component } from '@angular/core';
import {Persona} from "./persona";
import {PersonaService} from "./persona.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html'
})
export class FormPersonaComponent {

  public persona: Persona = new Persona();
  public tituloFormPersona = "Crear Persona";

  constructor(private personaService: PersonaService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.cargarPersona();

  }

  cargarPersona(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.personaService.getPersona(id).subscribe((persona) => this.persona = persona)
      }
    });
  }

  public createPersona(): void{
    this.personaService.createPersona(this.persona)
      .subscribe(
      response => {
        this.router.navigate(['/personas']);
        Swal.fire('Nueva Persona', `El persona  ${this.persona.nombres} ${this.persona.apellidos} ha sido creada con éxito!`, 'success');
      }
    )
  }


}
