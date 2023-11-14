import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PuestosComponent } from './puestos/puestos.component';
import { PuestoService } from './puestos/puesto.service';
import { CategoriaService } from './categorias/categoria.service';
import { ProyectoService } from './proyectos/proyecto.service';
import { PersonaService } from './personas/persona.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PersonasComponent } from './personas/personas.component';

const routes: Routes = [
  {path: '', redirectTo: '/puestos', pathMatch: 'full'},
  {path: 'puestos', component: PuestosComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'personas', component: PersonasComponent},
  
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
    PersonasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PuestoService, CategoriaService, ProyectoService, PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
