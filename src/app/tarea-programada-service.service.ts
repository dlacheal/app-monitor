import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TareaProgramadaService {
  public tareaSubscription: Subscription;
  private cierto : boolean;


  constructor( private alertService: AlertService) { }

  iniciarTareaProgramada(cierto: boolean): boolean {
    
    // Configura una tarea programada que se ejecuta cada 5 segundos
    //this.alertService.alert$.subscribe((res) => console.log("Saaaape"));
    this.tareaSubscription = interval(100000).subscribe(() => {
     
      console.log('Tarea programada ejecutada');
      this.cierto = this.showtAlert(cierto);

      
      // Agrega aquí la lógica de tu tarea programada
    });
    return this.cierto;
  }

  detenerTareaProgramada(): void {
    // Detiene la tarea programada cuando sea necesario
    this.tareaSubscription.unsubscribe();
  }

  showtAlert(cierto: boolean): boolean {
    if(cierto == false){
      cierto = true;
    }
      
    return cierto;
  }
}
