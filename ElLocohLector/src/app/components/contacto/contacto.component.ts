import { Component } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  constructor(private snackBar: MatSnackBar){}

  enviarFormulario(event: Event) {
    event.preventDefault(); // Evita el envío del formulario

    // Aquí puedes agregar la lógica para enviar el formulario usando HTTP, etc.

    // Mostrar el Snackbar de éxito
    this.snackBar.open('Formulario enviado con éxito!', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
    });

    // Restablecer el formulario
    const form = event.target as HTMLFormElement;
    form.reset();
  }
}
