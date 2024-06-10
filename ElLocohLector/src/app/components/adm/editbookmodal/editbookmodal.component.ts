import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editbookmodal',
  standalone: true,
  imports: [CommonModule, FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './editbookmodal.component.html',
  styleUrl: './editbookmodal.component.css'
})
export class EditbookmodalComponent {
  libro = {
    titulo: '',
    autor: '',
    editorial: '',
    categoria: '',
    edicion: '',
    cantidad: 0
  };

  constructor(public dialogRef: MatDialogRef<EditbookmodalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Libro editado:', this.libro);
    this.dialogRef.close(this.libro);
  }
}
