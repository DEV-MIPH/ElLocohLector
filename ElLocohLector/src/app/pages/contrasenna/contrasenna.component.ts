import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-contrasenna',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule,CommonModule,MatIconModule,MatIcon,MatButtonModule],
  templateUrl: './contrasenna.component.html',
  styleUrl: './contrasenna.component.css'
})
export class ContrasennaComponent {
  contrasennaForm = new FormGroup({
    nuevaContrasenna: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repetirContrasenna: new FormControl('', [Validators.required, Validators.minLength(8)])
});

constructor(private router: Router) {}

get nuevaContrasenna() {
    return this.contrasennaForm.get('nuevaContrasenna');
}

get repetirContrasenna() {
    return this.contrasennaForm.get('repetirContrasenna');
}

onSubmit() {
    if (this.contrasennaForm.valid && this.nuevaContrasenna?.value === this.repetirContrasenna?.value) {
        // Manejar el cambio de contraseña aquí
        console.log('Contraseña cambiada con éxito', this.contrasennaForm.value);
        // Navegar de regreso al perfil o mostrar un mensaje de éxito
        this.router.navigate(['/perfil']);
    } else {
        if (this.nuevaContrasenna?.value !== this.repetirContrasenna?.value) {
            this.repetirContrasenna?.setErrors({ mismatch: true });
        }
    }
}

//Para navegar a componente Perfil
cancelarContrasenna() {
  this.router.navigate(['/perfil']);
}
}
