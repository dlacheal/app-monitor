import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { LoginComponent } from './usuarios/login.component';

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
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import {AuthInterceptor} from "./usuarios/interceptors/auth.interceptor";





const routes: Routes = [
  {path: '', redirectTo: '/puestos', pathMatch: 'full'},
  {path: 'puestos', component: PuestosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'categorias', component: CategoriasComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'proyectos', component: ProyectosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'personas', component: PersonasComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'epps', component: EppsComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'empleados', component: EmpleadosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'registros', component: RegistrosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'notificaciones', component: NotificacionesComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  // form-create
  {path: 'categorias/form', component: FormCategoriaComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'puestos/form', component: FormPuestoComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'proyectos/form', component: FormProyectoComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'personas/form', component: FormPersonaComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'epps/form', component: FormEppComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'empleados/form', component: FormEmpleadoComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'registros/form', component: FormRegistroComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'usuarios/form', component: FormUsuarioComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'notificaciones/form', component: FormNotificacionComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  // form-edit
  {path: 'categorias/form/:id', component: FormCategoriaComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'puestos/form/:id', component: FormPuestoComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'proyectos/form/:id', component: FormProyectoComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'personas/form/:id', component: FormPersonaComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'epps/form/:id', component: FormEppComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'empleados/form/:id', component: FormEmpleadoComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'registros/form/:id', component: FormRegistroComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'usuarios/form/:id', component: FormUsuarioComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'notificaciones/form/:id', component: FormNotificacionComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  //form-pages
  {path: 'puestos/page/:page', component: PuestosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'categorias/page/:page', component: CategoriasComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'proyectos/page/:page', component: ProyectosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'personas/page/:page', component: PersonasComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'epps/page/:page', component: EppsComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'empleados/page/:page', component: EmpleadosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'registros/page/:page', component: RegistrosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'usuarios/page/:page', component: UsuariosComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  //ver
  {path: 'epps/ver/:id', component: DetalleEppComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'empleados/ver/:id', component: DetalleEmpleadoComponent, canActivate:[AuthGuard]},
  {path: 'notificaciones/ver/:id', component: DetalleNotificacionComponent, canActivate:[AuthGuard]},
  {path: 'registros/ver/:id', component: DetalleRegistroComponent, canActivate:[AuthGuard]},

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
    DetalleRegistroComponent,
    LoginComponent
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
    NotificacionService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
