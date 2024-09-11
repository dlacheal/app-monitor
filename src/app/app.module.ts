import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatBadgeModule } from "@angular/material/badge";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CategoriasComponent } from './categorias/categorias.component';
import { PuestosComponent } from './puestos/puestos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PersonasComponent } from './personas/personas.component';
import { EppsComponent } from './epps/epps.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { RegistrosComponent } from './registros/registros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

import { CategoriaService } from './categorias/categoria.service';
import { PuestoService } from './puestos/puesto.service';
import { ProyectoService } from './proyectos/proyecto.service';
import { PersonaService } from './personas/persona.service';
import { EppService } from './epps/epp.service';
import { EmpleadoService } from './empleados/empleado.service';
import { RegistroService } from './registros/registro.service';
import { UsuarioService } from './usuarios/usuario.service';
import { NotificacionService } from './notificaciones/notificacion.service';

import { FormCategoriaComponent } from './categorias/form-categoria.component';
import { FormPuestoComponent } from './puestos/form-puesto.component';
import { FormProyectoComponent } from './proyectos/form-proyecto.component';
import { FormPersonaComponent } from './personas/form-persona.component';
import { FormEppComponent } from './epps/form-epp.component';
import { FormEmpleadoComponent } from './empleados/form-empleado.component';
import { FormRegistroComponent } from './registros/form-registro.component';
import { FormUsuarioComponent } from './usuarios/form-usuario.component';
import { FormNotificacionComponent } from './notificaciones/form-notificacion.component';

import { PaginatorPuestoComponent } from './paginator/paginator-puesto.component';
import { PaginatorCategoriaComponent } from './paginator/paginator-categoria.component';
import { PaginatorEmpleadoComponent } from './paginator/paginator-empleado.component';
import { PaginatorEppComponent } from './paginator/paginator-epp.component';
import { PaginatorPersonaComponent } from './paginator/paginator-persona.component';
import { PaginatorProyectoComponent } from './paginator/paginator-proyecto.component';
import { PaginatorRegistroComponent } from './paginator/paginator-registro.component';
import { PaginatorUsuarioComponent } from './paginator/paginator-usuario.component';
import { PaginatorNotificacionComponent } from './paginator/paginator-notificacion.component';
import { DetalleEppComponent } from './epps/detalle-epp/detalle-epp.component';
import { DetalleEmpleadoComponent } from './empleados/detalle-empleado/detalle-empleado.component';
import { DetalleNotificacionComponent } from './notificaciones/detalle-notificacion/detalle-notificacion.component';
import { DetalleRegistroComponent } from './detalle-registro/detalle-registro.component';




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
  {path: 'notificaciones', component: NotificacionesComponent},
  // form-create
  {path: 'categorias/form', component: FormCategoriaComponent},
  {path: 'puestos/form', component: FormPuestoComponent},
  {path: 'proyectos/form', component: FormProyectoComponent},
  {path: 'personas/form', component: FormPersonaComponent},
  {path: 'epps/form', component: FormEppComponent},
  {path: 'empleados/form', component: FormEmpleadoComponent},
  {path: 'registros/form', component: FormRegistroComponent},
  {path: 'usuarios/form', component: FormUsuarioComponent},
  {path: 'notificaciones/form', component: FormNotificacionComponent},
  // form-edit
  {path: 'categorias/form/:id', component: FormCategoriaComponent},
  {path: 'puestos/form/:id', component: FormPuestoComponent},
  {path: 'proyectos/form/:id', component: FormProyectoComponent},
  {path: 'personas/form/:id', component: FormPersonaComponent},
  {path: 'epps/form/:id', component: FormEppComponent},
  {path: 'empleados/form/:id', component: FormEmpleadoComponent},
  {path: 'registros/form/:id', component: FormRegistroComponent},
  {path: 'usuarios/form/:id', component: FormUsuarioComponent},
  {path: 'notificaciones/form/:id', component: FormNotificacionComponent},
  //form-pages
  {path: 'puestos/page/:page', component: PuestosComponent},
  {path: 'categorias/page/:page', component: CategoriasComponent},
  {path: 'proyectos/page/:page', component: ProyectosComponent},
  {path: 'personas/page/:page', component: PersonasComponent},
  {path: 'epps/page/:page', component: EppsComponent},
  {path: 'empleados/page/:page', component: EmpleadosComponent},
  {path: 'registros/page/:page', component: RegistrosComponent},
  {path: 'usuarios/page/:page', component: UsuariosComponent},
  //ver
  {path: 'epps/ver/:id', component: DetalleEppComponent},
  {path: 'empleados/ver/:id', component: DetalleEmpleadoComponent},
  {path: 'notificaciones/ver/:id', component: DetalleNotificacionComponent},
  {path: 'registros/ver/:id', component: DetalleRegistroComponent},

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
    NotificacionesComponent,
    FormCategoriaComponent,
    FormPuestoComponent,
    FormProyectoComponent,
    FormPersonaComponent,
    FormEppComponent,
    FormEmpleadoComponent,
    FormRegistroComponent,
    FormUsuarioComponent,
    FormNotificacionComponent,
    PaginatorPuestoComponent,
    PaginatorCategoriaComponent,
    PaginatorEmpleadoComponent,
    PaginatorEppComponent,
    PaginatorPersonaComponent,
    PaginatorProyectoComponent,
    PaginatorRegistroComponent,
    PaginatorUsuarioComponent,
    PaginatorNotificacionComponent,
    DetalleEppComponent,
    DetalleEmpleadoComponent,
    DetalleNotificacionComponent,
    DetalleRegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBadgeModule
  ],
  providers: [
    PuestoService,
    CategoriaService,
    ProyectoService,
    PersonaService,
    EppService,
    EmpleadoService,
    RegistroService,
    UsuarioService,
    NotificacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
