import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectService } from './modules/lobby/services/connect.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private connectService: ConnectService) { }
  allowedEmails: string[] = [];

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const email = localStorage.getItem('email');

    if (!email) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.connectService.getAdmins().toPromise().then((admins: any) => {
      this.allowedEmails = admins.map((admin: any) => admin.email_usuario);
      console.log('Admins:', this.allowedEmails);

      if (next.routeConfig?.path === 'admin' && !this.allowedEmails.includes(email)) {
        // Si la ruta es 'admin' y el usuario no está en la lista de administradores, redirigir a lobby
        this.router.navigate(['/lobby']);
        return false;
      }

      console.log('Usuario ha entrado');
      return true; // Permitir acceso
    }).catch(() => {
      // Manejar errores en la solicitud
      this.router.navigate(['/login']);
      return false;
    });
  }

}
