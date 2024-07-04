import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);


  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;

  private pedidosSubject: BehaviorSubject<any[]>; // Nueva propiedad para manejar los pedidos
  public pedidos$: Observable<any[]>;

  constructor() {
    const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject = new BehaviorSubject<boolean>(savedLoginStatus);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();

    const savedPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    this.pedidosSubject = new BehaviorSubject<any[]>(savedPedidos);
    this.pedidos$ = this.pedidosSubject.asObservable();
  }

  getAuth() {
    return getAuth();
  }

  setLoggedIn(value: boolean, email?: string) {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value.toString());
    if (email) {
      localStorage.setItem('email', email);
    }
    if (!value) {
      localStorage.removeItem('pedidos'); // Limpiar pedidos al cerrar sesión
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
      const result = await signInWithEmailAndPassword(getAuth(), email, password);
      if (result.user != null) {
        console.log('Usuario autenticado:', result.user);
        this.setLoggedIn(true, email);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = createUserWithEmailAndPassword(getAuth(),email, password);
      console.log('Usuario registrado:', result);
      if((await result).user != null) {
        return true;
      }else{
        return false;
      }
    }catch (error) {
      console.error('Error al registrar:', error);
      return false;
    }
  }

  async forgetPassword(email: string) {
    try {
      sendPasswordResetEmail(getAuth(),email);
      return true;
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      return false;
    }
  }

  logout() {
    this.setLoggedIn(false, undefined); // Cambia el estado de isLoggedIn a false
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('pedidos'); // Limpiar pedidos al cerrar sesión
  }

   // Método para agregar un libro al pedido
   solicitarLibro(libro: any) {
    const pedidos = this.pedidosSubject.getValue();
    pedidos.push(libro);
    this.pedidosSubject.next(pedidos);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }

  // Método para obtener los pedidos del usuario
  getPedidos(): Observable<any[]> {
    return this.pedidos$;
  }
}
