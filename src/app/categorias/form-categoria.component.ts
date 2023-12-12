import { Component } from '@angular/core';
import { Categoria } from './categoria';
import {CategoriaService} from "./categoria.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent {

  public categoria: Categoria = new Categoria();
  public tituloFormCategoria = "Crear Categoria";

  constructor(private categoriaService: CategoriaService,
              private router: Router){}

  ngOnInit(){}

  public createCategoria(): void{
   this.categoriaService.createCategoria(this.categoria)
     .subscribe(
     categoria => {
       this.router.navigate(['/categorias']);
       Swal.fire('Nueva Categoria', `La descripción ${this.categoria.descripcion} ha sido creada con éxito!`, 'success');
     }
   )
  }

}
