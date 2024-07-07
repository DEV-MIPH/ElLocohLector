import { Component } from '@angular/core';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { modalestadolibrosComponent } from '../modalestadolibros/modalestadolibros.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

  constructor(public dialog: MatDialog) {}

  openImageModal(imageUrl: string): void {
    this.dialog.open(modalestadolibrosComponent, {
      data: { imageUrl }
    });
  }
}
