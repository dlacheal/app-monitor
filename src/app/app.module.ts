import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CategoriaService } from './categorias/categoria.service';
import { PuestoService } from './puestos/puesto.service';
import { ProyectoService } from './proyectos/proyecto.service';
import { PersonaService } from './personas/persona.service';
import { EppService } from './epps/epp.service';
import { EmpleadoService } from './empleados/empleado.service';

import { CategoriasComponent } from './categorias/categorias.component';
import { PuestosComponent } from './puestos/puestos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PersonasComponent } from './personas/personas.component';
import { EppsComponent } from './epps/epps.component';
import { EmpleadosComponent } from './empleados/empleados.component';


const routes: Routes = [
  {path: '', redirectTo: '/puestos', pathMatch: 'full'},
  {path: 'puestos', component: PuestosComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'personas', component: PersonasComponent},
  {path: 'epps', component: EppsComponent},
  {path: 'empleados', component: EmpleadosComponent},
  
];

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    CategoriasComponent,
    PuestosComponent,
    CategoriasComponent,
    ProyectosComponent,
    PersonasComponent,
    EppsComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PuestoService, 
    CategoriaService, 
    ProyectoService, 
    PersonaService,
    EppService,
    EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
