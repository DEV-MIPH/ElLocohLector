import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConnectService } from '../../../modules/lobby/services/connect.service';

@Component({
  selector: 'app-addbookmodal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './addbookmodal.component.html',
  styleUrl: './addbookmodal.component.css'
})
export class AddbookmodalComponent {
  /*Para agregar un nuevo libro*/
  nuevoLibro = {
    titulo: '',
    autor: '',
    editorial: '',
    categoria: '',
    edicion: '',
  };

  /*Constructor de modal*/
  constructor(public dialogRef: MatDialogRef<AddbookmodalComponent>, private connectService: ConnectService) {}

  
  /*Función de envio de nuevo libro*/
  onSubmit(): void {
    console.log('Enviando libro:', this.nuevoLibro); // Log para verificar los datos enviados
    this.connectService.agregarLibro(this.nuevoLibro).subscribe(
      (response) => {
        console.log('Libro agregado:', response);
        this.dialogRef.close(response); // Cierra el modal después de agregar el libro
      },
      (error) => {
        console.error('Error al agregar libro:', error);
      }
    );
  }

  /*función de cierre modal*/
  closeDialog(): void {
    this.dialogRef.close();
  }

}
