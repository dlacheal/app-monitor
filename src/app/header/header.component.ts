import { Component } from "@angular/core";
import {NotificacionService} from "../notificaciones/notificacion.service";
import {ActivatedRoute} from "@angular/router";
import {Notificacion} from "../notificaciones/notificacion";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  titleHeader: string = 'App Monitor';
  notificaciones: Notificacion[] = [];
  paginadorNotificacion: any;

  constructor(private notificacionService: NotificacionService,
              private activateRoute: ActivatedRoute){}

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

}
