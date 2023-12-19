import { Component } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import {Categoria} from "../categorias/categoria";
import Swal from "sweetalert2";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent {

  personas: Persona[];

  constructor(private personaService: PersonaService){}

  ngOnInit(): void{
    this.personaService.getPersonas().subscribe(
      personas => this.personas = personas
    );
  }

  deletePersona(persona: Persona): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la persona ${persona.nombres} ${persona.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.deletePersona(persona.id).subscribe(
          response => {
            this.personas = this.personas.filter(per => per !== persona);
            Swal.fire(
              'Persona Eliminiada!',
              `La Persona ${persona.nombres} ${persona.apellidos} ha sido eliminada con éxito.`,
              'success'
            )
          }
        );
      }
    })

  }

}
