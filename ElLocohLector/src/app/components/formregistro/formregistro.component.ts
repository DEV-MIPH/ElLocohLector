import { Component } from '@angular/core';

//Importaciones Form con angular
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';

//Importaciones card, button y toast
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

//importación a conectService
import { ConnectService } from '../../modules/lobby/services/connect.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formregistro',
  standalone: true,
  imports: [FormsModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './formregistro.component.html',
  styleUrl: './formregistro.component.css'
})
export class FormregistroComponent {

  constructor(private connectService: ConnectService, private snackBar: MatSnackBar) { }

  email: string = '';
  institucion: string = '';
  telefono: string = '';
  comentario: string = '';

  //validación para teléfono
  telefonoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[0-9]{9}$/.test(control.value);
      return valid ? null : { telefono: true };
    };
  }
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
  telefonoFormControl = new FormControl('', [Validators.required, this.telefonoValidator()]);
  institucionFormControl = new FormControl('', [Validators.required, this.institucionValidator()]);
  comentarioFormControl = new FormControl('', [Validators.required, this.comentarioValidator()]);
  matcher = new MyErrorStateMatcher();

  onSubmit() {
    

   

    // Realizar la solicitud de registro
    this.connectService.solicitudRegistro(this.email, this.telefono,this.institucion, this.comentario);

   
    
  }

  

}
