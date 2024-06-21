import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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

    const isAdmin = email === 'admin@admin.cl';

    //descargar dot env
    //guardar variable en env para seguridad
    if (next.routeConfig?.path === 'admin' && !isAdmin) {
      // Si la ruta es 'admin' y el usuario no es administrador, redirigir a lobby
      this.router.navigate(['/lobby']);
      return false;
    }

    if (isAdmin) {
      // Aquí se implementa una redirección o permitir el acceso basado en el rol de admin
      console.log('Administrador ha entrado')
      return true; // Permitir acceso
    } else {
      // Aquí se implementa una redirección o permitir el acceso basado en el rol de institución
      console.log('Institución ha entrado')
      return true; // Permitir acceso
    }
  }
}
