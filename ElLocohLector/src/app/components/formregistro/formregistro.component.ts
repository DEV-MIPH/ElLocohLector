import { Component } from '@angular/core';
//Formulario de Registro de institucion
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-formregistro',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './formregistro.component.html',
  styleUrl: './formregistro.component.css'
})
export class FormregistroComponent {

}
