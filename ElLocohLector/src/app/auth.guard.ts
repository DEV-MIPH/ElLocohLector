import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const email = localStorage.getItem('email');

    if (!email) {
      this.router.navigate(['/login']);
      return false;
    }
    //lista admin para recorrer environmets administradores
    private listaAdmin = environment.EMAILS{};

    for (let usuario in en ){

    }
    const allowedEmails = process.env.EMAILS.split(',');

    if (next.routeConfig?.path === 'admin' && !allowedEmails.includes(email)) {
      // Si la ruta es 'admin' y el usuario no está en la lista de administradores, redirigir a lobby
      this.router.navigate(['/lobby']);
      return false;
    }

    console.log('Usuario ha entrado');

    return true; // Permitir acceso
  }
}
