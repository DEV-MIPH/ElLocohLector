import { Component } from '@angular/core';

//import de componentes utilizados
import { FormregistroComponent } from '../formregistro/formregistro.component';
import { PuntodonacionComponent } from '../puntodonacion/puntodonacion.component';

//Botones principales de la pagina web
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { NosotrosComponent } from '../nosotros/nosotros.component';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ColaboradoresComponent, NosotrosComponent, MatButtonModule, MatIconModule, FormregistroComponent, PuntodonacionComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  mostrarFormularioRegistro = false;
  mostrarFormulario() {
    console.log("llegue aqui")
    this.mostrarFormularioRegistro = true;
    console.log(this.mostrarFormularioRegistro)
  }

  mostrarPuntos = false;
  mostrarPuntosDonacion() {
    console.log("llegue aqui")
    this.mostrarPuntos = true;
    console.log(this.mostrarPuntos)
  }

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
