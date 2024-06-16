import { Injectable, inject } from '@angular/core';
import { BehaviorSubject,Observable  } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);


  private isLoggedInSubject: BehaviorSubject<boolean>;

  public isLoggedIn: Observable<boolean>;

  constructor() {
    const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject = new BehaviorSubject<boolean>(savedLoginStatus);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
   }

   getAuth() {
    return getAuth();
   }

  setLoggedIn(value: boolean,email?: string) {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value.toString());
    if(email){
      localStorage.setItem('email', email);
    }
   
  }

  // login(email: string, password: string): Observable<boolean> {
  //   // Aquí deberías implementar la lógica de autenticación
  //   // En este ejemplo, simulamos una autenticación exitosa con credenciales fijas
  //   if () {
  //     this.setLoggedIn(true);
  //     return new Observable<boolean>(observer => {
  //       observer.next(true);
  //       observer.complete();
  //     });
  //   } else {
  //     return new Observable<boolean>(observer => {
  //       observer.next(false);
  //       observer.complete();
  //     });
  //   }
  // }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(getAuth(),email, password);
      if(result.user != null) {
        console.log('Usuario autenticado:', result.user);
        this.setLoggedIn(true,email);
        return true;
      }else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  logout() {
    this.setLoggedIn(false,undefined); // Cambia el estado de isLoggedIn a false
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
  }
}
