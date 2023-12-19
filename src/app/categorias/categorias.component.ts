import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import Swal from "sweetalert2";

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

  deleteCategoria(categoria: Categoria): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la categoria ${categoria.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deletCategoria(categoria.id).subscribe(
          response => {
            this.categorias = this.categorias.filter(cat => cat !== categoria);
            Swal.fire(
              'Categoria Eliminiada!',
              `La Categoria ${categoria.descripcion} ha sido eliminada con éxito.`,
              'success'
            )
          }
        );
      }
    })

  }

}
