import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectService } from '../../../modules/lobby/services/connect.service';

interface Ejemplar {
  nombre_libro: string;
  nombre_autor: string;
  nombre_categoria: string;
  nombre_editorial: string;
  edicion: string;
  descripcion: string;
}

@Component({
  selector: 'app-addejemplar',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  templateUrl: './addejemplar.component.html',
  styleUrl: './addejemplar.component.css'
})
export class AddejemplarComponent implements OnInit {
  ejemplarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private connectService: ConnectService,
    private dialogRef: MatDialogRef<AddejemplarComponent>,
    private snackBar: MatSnackBar
  ) {
    this.ejemplarForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      categoria: ['', Validators.required],
      editorial: ['', Validators.required],
      edicion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.ejemplarForm.valid) {
      this.connectService.agregarEjemplar(this.ejemplarForm.value).subscribe(
        response => {
          this.snackBar.open('Ejemplar añadido exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error al añadir ejemplar:', error);
          this.snackBar.open('Error al añadir ejemplar', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
