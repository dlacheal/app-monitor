import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent {
  
  listaCategoria: string[] = ['Altura', 'Básico', 'Construccion', 'Electricidad', 'Pintado'];

  categorias:  Categoria[];
  habilitar: boolean = true;

  constructor(private categoriaService: CategoriaService){}

  ngOnInit(){
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );
  }

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true)? false:true
  }

}
