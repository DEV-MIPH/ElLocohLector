import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../modules/lobby/services/connect.service';

@Component({
  selector: 'app-formregistro',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './formregistro.component.html',
  styleUrl: './formregistro.component.css'
})
export class FormregistroComponent {

  constructor(private connectService: ConnectService) { }

  email: string = '';
  institucion: string = '';
  telefono: string = '';
  comentario: string = '';

  onSubmit() {
    this.connectService.solicitudRegistro(this.email, this.telefono,this.institucion, this.comentario);
  }

  

}
