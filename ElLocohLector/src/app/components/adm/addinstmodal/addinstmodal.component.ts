import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-addinstmodal',
  standalone: true,
  imports: [  FormsModule,NgIf,MatFormFieldModule,MatInputModule,MatButtonModule  ],
  templateUrl: './addinstmodal.component.html',
  styleUrl: './addinstmodal.component.css'
})
export class AddinstmodalComponent {
  nuevaInstitucion = { email: '', password: '' };

  constructor(public dialogRef: MatDialogRef<AddinstmodalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Lógica para agregar la institución
    console.log('Nueva Institución:', this.nuevaInstitucion);
    this.dialogRef.close();
  }
}
