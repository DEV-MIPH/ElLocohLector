import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modalestadolibros',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './modalestadolibros.component.html',
  styleUrl: './modalestadolibros.component.css'
})
export class modalestadolibrosComponent {
  constructor(
    public dialogRef: MatDialogRef<modalestadolibrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
  ) {}

 
}
