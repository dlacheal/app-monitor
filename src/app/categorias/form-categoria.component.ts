import {Component} from '@angular/core';
import {Categoria} from './categoria';
import {CategoriaService} from "./categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Observer, throwError} from "rxjs";


@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent {

  public categoria: Categoria = new Categoria();
  public tituloFormCategoria = "Crear Categoria";

  public errores: string[];

  constructor(private categoriaService: CategoriaService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.categoriaService.getCategoria(id)
          .subscribe((categoria) => this.categoria = categoria)
      }
    });
  }

  public createCategoriaDeprecated(): void {
    this.categoriaService.createCategoria(this.categoria)
      .subscribe(categoria => {
          this.router.navigate(['/categorias']);
          Swal.fire('Nueva Categoria', `La descripción ${this.categoria.descripcion} ha sido creada con éxito!`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  public createCategoria(): void {
    const observer: Observer<Categoria> = {
      next: (categoria) => {
        this.router.navigate(['/categorias']);
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
            console.error("Mensaje error createCategoria 400: " + err.error.errors);
            break
          case 500:
            //this.errores = err.error.mensaje as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createCategoria 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error createCategoria: codigo no validado");
            break;
        }
        //////////////////////////////////////////////////

      },
      complete: () => {
        Swal.fire('Nueva Categoria', `La descripción ${this.categoria.descripcion} ha sido creada con éxito!`, 'success');
      }
    };
    this.categoriaService.createCategoria(this.categoria).subscribe(observer);
  }



  public updateCategoriaDeprecated(): void {
    this.categoriaService.updateCategoria(this.categoria)
      .subscribe(categoria => {
          this.router.navigate(['/categorias']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.string);
          console.error("Mensaje Error: " + err.error.errors);
        }
      );
  }

  public updateCategoria(): void {
    const observer: Observer<Categoria> = {
      next: (categoria) => {
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        // this.errores = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error("Mensaje Error: " + err.error.mensaje);

        //////////////////////////////////////////////////
        switch (err.status) {
          case 400:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateCategoria 400: " + err.error.errors);
            break
          case 500:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateCategoria 500: " + err.error.mensaje);
            break;
          default:
            console.error('Código del error desde el backend: ' + err.status);
            console.error("Mensaje error updateCategoria: codigo no validado ");
            break;
        }
        //////////////////////////////////////////////////
      },
      complete: () => {
        Swal.fire('Categoria actualizada', `Categoria ${this.categoria.descripcion} ha sido actualizada con éxito!`, 'success');
      }
    };
    this.categoriaService.updateCategoria(this.categoria).subscribe(observer);
  }

}
