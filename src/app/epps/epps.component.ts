import { Component } from '@angular/core';
import { EppService } from './epp.service';
import { Epp } from './epp';

@Component({
  selector: 'app-epps',
  templateUrl: './epps.component.html'
})
export class EppsComponent {
  
  epps: Epp[];

  constructor(private eppService: EppService){}

  ngOnInit(){
    this.eppService.getEpps().subscribe(
      epps => this.epps = epps
    );
  }

}
