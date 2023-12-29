import { Component } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent {

  personas: Persona[];
  paginadorPersona: any;

  constructor(private personaService: PersonaService,
              private activateRoute: ActivatedRoute) {}

  ngOnInit(): void{

    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

    this.personaService.getPersonasPage(page)
      .subscribe(response => {
      this.personas = response.content as Persona[];
      this.paginadorPersona = response;
    });
  });
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
