import { Component } from '@angular/core';
import { Categoria } from './categoria';
import {CategoriaService} from "./categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent {

  public categoria: Categoria = new Categoria();
  public tituloFormCategoria = "Crear Categoria";

  constructor(private categoriaService: CategoriaService,
              private router: Router,
              private activateRoute: ActivatedRoute){
  }

  ngOnInit(){

    this.cargarCategoria();
  }

  cargarCategoria(): void{
    this.activateRoute.params.subscribe(params =>{
        let id = params['id'];
        if(id){
          this.categoriaService.getCategoria(id)
            .subscribe((categoria) => this.categoria = categoria)
        }
      });
  }

  public createCategoria(): void{
   this.categoriaService.createCategoria(this.categoria)
     .subscribe(
     categoria => {
       this.router.navigate(['/categorias']);
       Swal.fire('Nueva Categoria', `La descripción ${this.categoria.descripcion} ha sido creada con éxito!`, 'success');
     }
   )
  }

  public updateCategoria(): void{
    this.categoriaService.updateCategoria(this.categoria)
      .subscribe(categoria => {
        this.router.navigate(['/categorias'])
        Swal.fire('Categoria actualizada', `Categoria ${this.categoria.descripcion} ha sido actualizada con éxito!`, 'success');
      });
  }

}
