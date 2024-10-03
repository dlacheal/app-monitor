import { Component } from '@angular/core';
import { TareaProgramadaService } from './tarea-programada-service.service';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular !';

  curso: string = 'Curso Spring 5 con Angular 7';
  profesor: string = "David Lache Alvarez";
  public cierto: boolean;

  public showAlert = false;

  constructor(private tareaProgramadaService: TareaProgramadaService,
              private alertService: AlertService) {

    }

  ngOnInit(): void {
    //this.alertService.alert$.subscribe((res) => (this.showAlert = true));
    //this.cierto = false;
    //this.cierto = this.tareaProgramadaService.iniciarTareaProgramada(this.cierto);


  }

  ngOnDestroy(): void {
    this.tareaProgramadaService.detenerTareaProgramada();
  }
}
