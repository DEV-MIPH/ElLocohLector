import { Component } from '@angular/core';

//import de componentes utilizados
import { FormregistroComponent } from '../formregistro/formregistro.component';
import { PuntodonacionComponent } from '../puntodonacion/puntodonacion.component';
import { ContactoComponent } from '../contacto/contacto.component';

//Botones principales de la pagina web
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NosotrosComponent } from '../nosotros/nosotros.component';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';
import { BooksComponent } from '../books/books.component';



@Component({
    selector: 'app-body',
    standalone: true,
    templateUrl: './body.component.html',
    styleUrl: './body.component.css',
    imports: [ColaboradoresComponent, NosotrosComponent, MatButtonModule, MatIconModule, FormregistroComponent, PuntodonacionComponent, BooksComponent, ContactoComponent]
})
export class BodyComponent {

  mostrarFormularioRegistro = false;

  mostrarFormulario() {
    console.log("llegue aqui")
    this.mostrarFormularioRegistro = true;
    this.mostrarPuntos = false;
    this.mostrarBooks = false;
    this.mostrarContacto = false;
    console.log(this.mostrarFormularioRegistro)
  }

  mostrarPuntos = true;
  mostrarPuntosDonacion() {
    console.log("llegue aqui")
    this.mostrarPuntos = true;
    this.mostrarFormularioRegistro = false;
    this.mostrarBooks = false;
    this.mostrarContacto = false;
    console.log(this.mostrarPuntos)
  }
  mostrarBooks = false;
  mostrarBooksDonacion() {
    console.log("llegue aqui")
    this.mostrarBooks = true;
    this.mostrarFormularioRegistro = false;
    this.mostrarPuntos = false;
    this.mostrarContacto = false;
    console.log(this.mostrarBooks)
  }

  mostrarContacto = false;
  mostrarContactoDonacion(){
    console.log("llegue aqui")
    this.mostrarContacto = true;
    this.mostrarFormularioRegistro = false;
    this.mostrarPuntos = false;
    this.mostrarBooks = false;
    console.log(this.mostrarContacto)
  }

  nosotros = false;

  colaboradores = false;

  mostrarNosotros() {
    console.log("llamando a nosotros")
    this.nosotros = true;
    this.colaboradores = false;
    console.log(this.nosotros)
  }
  mostrarColaboradores() {
    console.log("llamando a colaboradores")
    this.colaboradores = true;
    this.nosotros = false;
    console.log(this.nosotros)
  }





}
