import { Component } from '@angular/core';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { modalestadolibrosComponent } from '../modalestadolibros/modalestadolibros.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadolibro',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './estadolibro.component.html',
  styleUrl: './estadolibro.component.css'
})
export class EstadolibroComponent {
  
  constructor(public dialog: MatDialog) {}

  openImageModal(imageUrl: string): void {
    this.dialog.open(modalestadolibrosComponent, {
      data: { imageUrl }
    });
  }
}
