import { Component } from '@angular/core';
import {Puesto} from "./puesto";
import {PuestoService} from "./puesto.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Observer} from "rxjs";
import {Categoria} from "../categorias/categoria";

@Component({
  selector: 'app-form-puesto',
  templateUrl: './form-puesto.component.html'
})
export class FormPuestoComponent {

  public puesto: Puesto = new Puesto();
  public tituloFormPuesto = "Formulario Puesto";

  constructor(private puestoService: PuestoService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.cargarPuesto();
  }

  cargarPuesto(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.puestoService.getPuesto(id).subscribe((puesto) => this.puesto = puesto)
      }
    });
  }

  public createPuestoDeprecated(): void{
    this.puestoService.createPuesto(this.puesto).subscribe(
      response => {
        this.router.navigate(['/puestos']);
        Swal.fire('Nuevo Puesto', `El puesto  ${this.puesto.descripcion} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public createPuesto(): void {
    const observer: Observer<Puesto> = {
      next: (puesto) => {
        this.router.navigate(['/puestos']);
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
            console.error("Mensaje error createPuesto 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createPuesto 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createPuesto: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nuevo Puesto', `El puesto  ${this.puesto.descripcion} ha sido creado con éxito!`, 'success');
      }
    };
    this.puestoService.createPuesto(this.puesto).subscribe(observer);
  }

  public updatePuestoDeprecated(): void{
    this.puestoService.updatePuesto(this.puesto)
      .subscribe(puesto => {
        this.router.navigate(['/puestos'])
        Swal.fire('Puesto actualizado', `Puesto  ${this.puesto.descripcion} ha sido actualizado con éxito!`, 'success');
      });
  }

  public updatePuesto(): void {
    const observer: Observer<Puesto> = {
      next: (puesto) => {
        this.router.navigate(['/puestos']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updatePuesto 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updatePuesto 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updatePuesto: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Puesto actualizado', `Puesto  ${this.puesto.descripcion} ha sido actualizado con éxito!`, 'success');
      }
    };
    this.puestoService.updatePuesto(this.puesto).subscribe(observer);
  }
}
