import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectService } from '../../../modules/lobby/services/connect.service';

@Component({
  selector: 'app-addinstmodal',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './addinstmodal.component.html',
  styleUrl: './addinstmodal.component.css'
})


export class AddinstmodalComponent {
  nuevaInstitucion = { email: '', password: '', nombre_usuario: '', fono_usuario: '', cel_usuario: '' };

  constructor(public dialogRef: MatDialogRef<AddinstmodalComponent>, public auth: AuthService, private snackBar: MatSnackBar, private connectService: ConnectService) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    // Lógica para agregar la institución
    console.log('Nueva Institución:', this.nuevaInstitucion);
    const register = await this.auth.register(this.nuevaInstitucion.email, this.nuevaInstitucion.password);
    if (register) {
      this.connectService.register(this.nuevaInstitucion.email, this.nuevaInstitucion.password);
      this.connectService.registerInstitucion(this.nuevaInstitucion.nombre_usuario, this.nuevaInstitucion.email,this.nuevaInstitucion.fono_usuario, this.nuevaInstitucion.cel_usuario);
      this.snackBar.open('Correo ' + this.nuevaInstitucion.email + ' agregado correctamente.', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Error al agregar correo . Inténtelo nuevamente. Verifique Correo', 'Cerrar', {
        duration: 3000,
      });
    }
    this.dialogRef.close();
  }
}
