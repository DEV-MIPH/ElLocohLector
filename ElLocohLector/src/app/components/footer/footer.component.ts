import { Component } from '@angular/core';

import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  Body: BodyComponent = new BodyComponent;

  mostrarNosotros(){
    this.Body.mostrarNosotros();
  }

  mostrarColaboradores(){
    this.Body.mostrarColaboradores();
  }



}
