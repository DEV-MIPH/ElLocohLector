import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean>;

  public isLoggedIn: Observable<boolean>;

  constructor() {
    const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject = new BehaviorSubject<boolean>(savedLoginStatus);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
   }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value.toString());
  }

  login(email: string, password: string): Observable<boolean> {
    // Aquí deberías implementar la lógica de autenticación
    // En este ejemplo, simulamos una autenticación exitosa con credenciales fijas
    if (email === 'admin@admin.cl' && password === 'admin1234') {
      this.setLoggedIn(true);
      return new Observable<boolean>(observer => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  logout() {
    this.setLoggedIn(false); // Cambia el estado de isLoggedIn a false
    localStorage.removeItem('isLoggedIn');
  }
}
