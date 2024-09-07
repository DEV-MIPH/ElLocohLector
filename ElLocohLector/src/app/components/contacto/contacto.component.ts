import { Component } from '@angular/core';

//Importaciones
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

//importación a conectService
import { ConnectService } from '../../modules/lobby/services/connect.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatSnackBarModule,FormsModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  constructor(private connectService: ConnectService, private snackBar: MatSnackBar){}

  institucion: string = '';
  email: string = '';
  comentario: string = '';

  //Validación para institucion
  institucionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value && control.value.trim() !== '';
      return valid ? null : { institucion: true };
    };
  }
  //Validación para comentario
  comentarioValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value && control.value.trim() !== '';
      return valid ? null : { comentario: true };
    };
  }


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  institucionFormControl = new FormControl('', [Validators.required, this.institucionValidator()]);
  comentarioFormControl = new FormControl('', [Validators.required, this.comentarioValidator()]);
  matcher = new MyErrorStateMatcher();

  enviarFormulario(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (this.institucionFormControl.valid && this.emailFormControl.valid && this.comentarioFormControl.valid) {
      this.connectService.mensajeContacto(this.email, this.institucion, this.comentario);
      this.snackBar.open('Formulario enviado con éxito', 'Cerrar', {
        duration: 3000,
      });

      // Restablecer el formulario
      const form = event.target as HTMLFormElement;
      form.reset();

      // Restablecer los controles del formulario
      this.institucionFormControl.reset();
      this.emailFormControl.reset();
      this.comentarioFormControl.reset();
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
