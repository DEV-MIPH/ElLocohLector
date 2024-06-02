import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl,Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
    imports: [CommonModule,FooterComponent, HeaderComponent,MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule]
})
export class PerfilComponent {

    institucion = new FormGroup({
        rut: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        direccion: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email])
    });

    /*Para mostrar error u actualizacion existosa dentro del form*/
    showError: boolean = false;
    showSuccess: boolean = false;

    constructor(private router: Router) {}

    getEmailErrorMessage() {
        const emailControl = this.institucion.get('email');
        if (emailControl) {
            if (emailControl.hasError('required')) {
                return 'Debe ingresar un valor';
            } else if (emailControl.hasError('email')) {
                return 'No es un email válido';
            }
        }
        return '';
    }

    onSubmit() {
        if (this.institucion.valid) {
            // Aquí se puede manejar el envío del formulario
            console.log('Formulario válido', this.institucion.value);
            this.showError = false;
            this.showSuccess = true;
        } else {
            console.log('Formulario no válido');
            this.showError = true;
            this.showSuccess = false;
        }
    }

    //Para navegar a componente Contrasenna al apretar el button de cambiar de contraseña
    cambiarContrasenna() {
        this.router.navigate(['/contrasenna']);
    }

}
