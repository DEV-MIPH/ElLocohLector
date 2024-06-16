import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddinstmodalComponent } from '../adm/addinstmodal/addinstmodal.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,NgIf,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  constructor(public dialogRef: MatDialogRef<AddinstmodalComponent>,public auth: AuthService, private snackBar: MatSnackBar ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  email: string = '';

  async onSubmit(): Promise<void> {
    
    const forget = await this.auth.forgetPassword(this.email);
    if(forget) {
      this.snackBar.open('Correo '+ this.email + ' enviado correctamente.', 'Cerrar', {
        duration: 3000,
      });
    }else{
      this.snackBar.open('Error al enviar correo . Inténtelo nuevamente. Verifique Correo', 'Cerrar', {
        duration: 3000,
      });
    }
    this.dialogRef.close();
  }
}
