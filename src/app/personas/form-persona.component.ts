import { Component } from '@angular/core';
import {Persona} from "./persona";
import {PersonaService} from "./persona.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Observer} from "rxjs";

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

  public createPersonaDeprecated(): void{
    this.personaService.createPersona(this.persona)
      .subscribe(
      response => {
        this.router.navigate(['/personas']);
        Swal.fire('Nueva Persona', `La persona  ${this.persona.nombres} ${this.persona.apellidos} ha sido creada con éxito!`, 'success');
      }
    )
  }

  public createPersona(): void {
    const observer: Observer<Persona> = {
      next: (persona) => {
        this.router.navigate(['/personas']);
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
            console.error("Mensaje error createPersona 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createPersona 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createPersona: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nueva Persona', `La persona  ${this.persona.nombres} ${this.persona.apellidos} ha sido creada con éxito!`, 'success');
      }
    };
    this.personaService.createPersona(this.persona).subscribe(observer);
  }

  public updatePersonaDeprecated(): void{
    this.personaService.updatePersona(this.persona)
      .subscribe(persona => {
        this.router.navigate(['/personas'])
        Swal.fire('Persona actualizada', `Persona ${this.persona.nombres} ${this.persona.apellidos} ha sido actualizada con éxito!`, 'success');
      });
  }

  public updatePersona(): void {
    const observer: Observer<Persona> = {
      next: (categoria) => {
        this.router.navigate(['/personas']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updatePersona 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updatePersona 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updatePersona: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Persona actualizada', `Persona ${this.persona.nombres} ${this.persona.apellidos} ha sido actualizada con éxito!`, 'success');
      }
    };
    this.personaService.updatePersona(this.persona).subscribe(observer);
  }


}
