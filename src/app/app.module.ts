import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { CategoriaService } from './categorias/categoria.service';
import { PuestoService } from './puestos/puesto.service';
import { ProyectoService } from './proyectos/proyecto.service';
import { PersonaService } from './personas/persona.service';
import { EppService } from './epps/epp.service';
import { EmpleadoService } from './empleados/empleado.service';
import { RegistroService } from './registros/registro.service';
import { UsuarioService } from './usuarios/usuario.service';

import { CategoriasComponent } from './categorias/categorias.component';
import { PuestosComponent } from './puestos/puestos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PersonasComponent } from './personas/personas.component';
import { EppsComponent } from './epps/epps.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { RegistrosComponent } from './registros/registros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { FormsModule } from '@angular/forms';
import { FormCategoriaComponent } from './categorias/form-categoria.component';
import { FormPuestoComponent } from './puestos/form-puesto.component';
import { FormProyectoComponent } from './proyectos/form-proyecto.component';
import { FormPersonaComponent } from './personas/form-persona.component';
import { FormEppComponent } from './epps/form-epp.component';
import { FormEmpleadoComponent } from './empleados/form-empleado.component';
import { FormRegistroComponent } from './registros/form-registro.component';
import { FormUsuarioComponent } from './usuarios/form-usuario.component';



const routes: Routes = [
  {path: '', redirectTo: '/puestos', pathMatch: 'full'},
  {path: 'puestos', component: PuestosComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'personas', component: PersonasComponent},
  {path: 'epps', component: EppsComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'registros', component: RegistrosComponent},
  {path: 'usuarios', component: UsuariosComponent},
  // form-create
  {path: 'categorias/form', component: FormCategoriaComponent},
  {path: 'puestos/form', component: FormPuestoComponent},
  {path: 'proyectos/form', component: FormProyectoComponent},
  {path: 'personas/form', component: FormPersonaComponent},
  {path: 'epps/form', component: FormEppComponent},
  {path: 'empleados/form', component: FormEmpleadoComponent},
  {path: 'registros/form', component: FormRegistroComponent},
  {path: 'usuarios/form', component: FormUsuarioComponent},
  // form-edit
  {path: 'categorias/form/:id', component: FormCategoriaComponent},
  {path: 'puestos/form/:id', component: FormPuestoComponent},
  {path: 'proyectos/form/:id', component: FormProyectoComponent},
  {path: 'personas/form/:id', component: FormPersonaComponent},
  {path: 'epps/form/:id', component: FormEppComponent},
  {path: 'empleados/form/:id', component: FormEmpleadoComponent},
  {path: 'registros/form/:id', component: FormRegistroComponent},
  {path: 'usuarios/form/:id', component: FormUsuarioComponent},

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
    EmpleadosComponent,
    RegistrosComponent,
    UsuariosComponent,
    FormCategoriaComponent,
    FormPuestoComponent,
    FormProyectoComponent,
    FormPersonaComponent,
    FormEppComponent,
    FormEmpleadoComponent,
    FormRegistroComponent,
    FormUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    PuestoService,
    CategoriaService,
    ProyectoService,
    PersonaService,
    EppService,
    EmpleadoService,
    RegistroService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
