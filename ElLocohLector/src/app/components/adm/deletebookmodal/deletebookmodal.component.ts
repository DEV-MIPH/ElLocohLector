import { Component,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deletebookmodal',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './deletebookmodal.component.html',
  styleUrl: './deletebookmodal.component.css'
})
export class DeletebookmodalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletebookmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
