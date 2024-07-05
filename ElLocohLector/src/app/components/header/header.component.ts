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
import { ConnectService } from '../../modules/lobby/services/connect.service';

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
  private adminEmails: string[] = []; // Lista de correos de administradores obtenida del backend
 

  constructor(private authService: AuthService, private router: Router, private connectservice: ConnectService) {
    
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        const userEmail = localStorage.getItem('email');
        console.log('User email:', userEmail); // Agrega este log para verificar el correo electrónico del usuario

        this.getAdmins().then((adminEmails: string[]) => {
          this.adminEmails = adminEmails;
          this.isAdmin = this.adminEmails.includes(userEmail || '');
          console.log('Is Admin:', this.isAdmin); // Agrega este log para verificar si se detecta como admin
        });
      }
    });
  }

  getAdmins(): Promise<string[]> {
    return this.connectservice.getAdmins().toPromise().then((admins: any) => {
      return admins.map((admin: any) => admin.email_usuario);
    });
  }

  logout() {
    this.authService.logout(); // Llama al método logout de AuthService
    this.router.navigate(['/lobby']); // Redirige al usuario a la página de lobby
  }
}

// isLoggedIn: boolean = false; // Variable para controlar el estado de inicio de sesión
//   isAdmin: boolean = false; // Variable para controlar si el usuario es administrador

  

//   constructor(private authService: AuthService, private router: Router, private connectservice: ConnectService) {
    
//   }
  
//   private adminEmails: string[] =[]

//   ngOnInit(): void {
//     this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
//       this.isLoggedIn = loggedIn;

//       if (loggedIn) {
//         const userEmail = localStorage.getItem('email');
//         console.log('User email:', userEmail); // Agrega este log para verificar el correo electrónico del usuario
//         this.isAdmin = this.adminEmails.includes(userEmail || '');
//         console.log('Is Admin:', this.isAdmin); // Agrega este log para verificar si se detecta como admin
//         // this.adminEmails = this.connectservice.getAdmins();
//       }
//     });
//   }