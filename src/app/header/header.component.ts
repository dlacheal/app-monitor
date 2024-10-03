import { Component } from "@angular/core";
import {NotificacionService} from "../notificaciones/notificacion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Notificacion} from "../notificaciones/notificacion";
import {AuthService} from "../usuarios/auth.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

  /** Atributos **/
  titleHeader: string = 'App Monitor';
  notificaciones: Notificacion[] = [];
  paginadorNotificacion: any;


  /** Constructor **/
  constructor(private notificacionService: NotificacionService,
              private activateRoute: ActivatedRoute,
              public authService: AuthService,
              private router: Router){}

  ngOnInit(): void{
    let page = 0;
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.notificacionService.getNotificacionesPage(page)
        .subscribe(response => {
          this.notificaciones = response.content as Notificacion[];
          this.paginadorNotificacion = response;
        });
    });
  }

  /** Metodos **/
  logout(): void{
    let username = this.authService.usuario.username;
    this.authService.logout();

    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}
