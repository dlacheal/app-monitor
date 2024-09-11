import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alertaSource = new Subject();
  
  alert$ = this.alertaSource.asObservable();

  constructor() { }

  showtAlert(){
    this.alertaSource.next('Por favor muestra el alert');
  }
}
