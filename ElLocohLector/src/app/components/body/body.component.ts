import { Component } from '@angular/core';
import { NosotrosComponent } from '../nosotros/nosotros.component';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ColaboradoresComponent, NosotrosComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  nosotros = false;

  colaboradores = false;

  mostrarNosotros(){
    console.log("llamando a nosotros")
    this.nosotros = true;
    this.colaboradores = false;
    console.log(this.nosotros)
  }
  mostrarColaboradores(){
    console.log("llamando a colaboradores")
    this.colaboradores = true;
    this.nosotros = false;
    console.log(this.nosotros)
  }

  



}
