import {Component, OnInit} from '@angular/core';
import {Categoria} from './categoria';
import {CategoriaService} from './categoria.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit{

  // listaCategoria: string[] = ['Altura', 'Básico', 'Construccion', 'Electricidad', 'Pintado'];

  tituloCategoria: String =  'Listado de Categorias';
  categorias: Categoria[];
  habilitar: boolean = true;
  paginadorCategoria: any;

  constructor(private categoriaService: CategoriaService,
              private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log("page:" + this.activateRoute);

      if (!page) {
        page = 0;
      }

      this.categoriaService.getCategoriasPage(+page)
        .subscribe(response => {
          this.categorias = response.content as Categoria[];
          this.paginadorCategoria = response;
        });
    });
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true
  }

  deleteCategoria(categoria: Categoria): void {

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
