import { Component } from '@angular/core';
import {Epp} from "./epp";
import {EppService} from "./epp.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Categoria} from "../categorias/categoria";
import {CategoriaService} from "../categorias/categoria.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-epp',
  templateUrl: './form-epp.component.html'
})
export class FormEppComponent {

  public epp: Epp = new Epp();
  public tituloFormEpp = "Crear Epp";
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

  public createEpp(): void{
    this.eppService.createEpp(this.epp)
      .subscribe(
      response => {
        this.router.navigate(['/epps']);
        Swal.fire('Nuevo Epp', `El epp  ${this.epp.nombre} ha sido creado con éxito!`, 'success');
      }
    )
  }

  public updateEpp(): void{
    this.eppService.updateEpp(this.epp)
      .subscribe(epp => {
        this.router.navigate(['/epps'])
        Swal.fire('Epp actualizado', `Epp ${this.epp.nombre} ha sido actualizado con éxito!`, 'success');
      });
  }
}
