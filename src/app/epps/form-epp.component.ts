import { Component } from '@angular/core';
import {Epp} from "./epp";
import {EppService} from "./epp.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Categoria} from "../categorias/categoria";
import {CategoriaService} from "../categorias/categoria.service";
import Swal from "sweetalert2";
import {Observer} from "rxjs";

@Component({
  selector: 'app-form-epp',
  templateUrl: './form-epp.component.html'
})
export class FormEppComponent {

  public epp: Epp = new Epp();
  public tituloFormEpp = "Formulario Epp";
  public categoriasEpp: Categoria[];

  constructor(private eppService: EppService,
              private categoriaService: CategoriaService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void{
    // this.cargarEpp();
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.eppService.getEpp(id).subscribe((epp) => this.epp = epp)
      }
    });
    this.categoriaService.getCategorias().subscribe(categorias => this.categoriasEpp = categorias);

  }

  // cargarEpp(): void{
  //   this.activateRoute.paramMap.subscribe(params => {
  //     let id = +params.get('id');
  //     if(id){
  //       this.eppService.getEpp(id).subscribe((epp) => this.epp = epp)
  //     }
  //   });
  // }

  public createEppDeprecated(): void{
    this.eppService.createEpp(this.epp)
      .subscribe(
      response => {
        this.router.navigate(['/epps']);
        Swal.fire('Nuevo Epp', `El epp  ${this.epp.nombre} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public createEpp(): void {
    const observer: Observer<Epp> = {
      next: (epp) => {
        this.router.navigate(['/epps']);
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
            console.error("Mensaje error createEpp 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createEpp 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createEpp: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nuevo Epp', `El epp  ${this.epp.nombre} ha sido creado con éxito!`, 'success');
      }
    };
    this.eppService.createEpp(this.epp).subscribe(observer);
  }

  public updateEppDeprecated(): void{
    this.eppService.updateEpp(this.epp)
      .subscribe(epp => {
        this.router.navigate(['/epps'])
        Swal.fire('Epp actualizado', `Epp ${this.epp.nombre} ha sido actualizado con éxito!`, 'success');
      });
  }

  public updateEpp(): void {
    const observer: Observer<Epp> = {
      next: (epp) => {
        this.router.navigate(['/epps']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateEpp 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateEpp 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateEpp: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Epp actualizado', `Epp ${this.epp.nombre} ha sido actualizado con éxito!`, 'success');
      }
    };
    this.eppService.updateEpp(this.epp).subscribe(observer);
  }

  compararCategoria(c1: Categoria, c2:Categoria): boolean{

    if(c1 === undefined && c2 === undefined){
      return true;
    }
    return c1 === null || c2 === null || c1 === undefined || c2 === undefined? false: c1.id === c2.id;
  }
}
