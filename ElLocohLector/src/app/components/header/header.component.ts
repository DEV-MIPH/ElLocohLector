import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
//importamos la redireccion
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatMenuModule,MatButtonModule,MatIconModule,RouterOutlet,RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false; // Variable para controlar el estado de inicio de sesión
  isAdmin: boolean = false; // Variable para controlar si el usuario es administrador

  private adminEmails: string[] = ['admin@admin.cl', 'mi.leivac@duocuc.cl', 'cla.jelvez@duocuc.cl', 'migu.pereira@duocuc.cl'];

  constructor(private authService: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        const userEmail = localStorage.getItem('email');
        console.log('User email:', userEmail); // Agrega este log para verificar el correo electrónico del usuario
        this.isAdmin = this.adminEmails.includes(userEmail || '');
        console.log('Is Admin:', this.isAdmin); // Agrega este log para verificar si se detecta como admin
      }
    });
  }

  logout() {
    this.authService.logout(); // Llama al método logout de AuthService
    this.router.navigate(['/lobby']); // Redirige al usuario a la página de lobby
  }
}
