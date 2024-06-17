import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


interface Editorial {
  nombre_editorial: string;
}

interface Categoria {
  nombre_categoria: string;
}

interface Edicion {
  nombre_edicion: string;
}

interface Autor {
  nombre_autor: string;
  apellido_autor: string;

}

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  data: any = [];
  apiUrl = 'http://localhost:3000/libros'; // URL de tu API
  pedidosSubject = new BehaviorSubject<any[]>([]); //para manejar los pedidos del usuario
  apiUrlAllBooks = 'http://localhost:3000/all_libros';
  apiUrlAutores = 'http://localhost:3000/autores';
  apiUrlCategorias = 'http://localhost:3000/categorias';
  apiUrlEditoriales = 'http://localhost:3000/editoriales';
  apiUrlEdiciones = 'http://localhost:3000/ediciones';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Inicialmente no logueado
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  // Método para actualizar el estado de inicio de sesión
  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  ngOnInit(): void {

  }
  
  //funciones get para obtener url
  getLibros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrlAllBooks);
  }
  getAutores(): Observable<any> {
    return this.http.get<any>(this.apiUrlAutores);
  }
  getCategorias(): Observable<any> {
    return this.http.get<any>(this.apiUrlCategorias);
  }
  getEditoriales(): Observable<any> {
    return this.http.get<any>(this.apiUrlEditoriales);
  }
  getEdiciones(): Observable<any> {
    return this.http.get<any>(this.apiUrlEdiciones);
  }

  agregarLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro);
  }

  agregarAutor(autor: any): Observable<any> {
    return this.http.post<any>(this.apiUrlAutores, autor);
  }

  agregarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.apiUrlCategorias, categoria);
  }

  agregarEditorial(editorial: Editorial): Observable<any> {
    console.log('Agregando editorial connect service:', editorial);
    return this.http.post<any>(this.apiUrlEditoriales, editorial);
  }

  agregarEdicion(edicion: any): Observable<any> {
    return this.http.post<any>(this.apiUrlEdiciones, edicion);
  }

   // Función para agregar un libro al pedido
  solicitarLibro(libro: any): void {
    console.log('Libro solicitado:', libro);
    const pedidos = this.pedidosSubject.getValue(); // Obtener los pedidos actuales del BehaviorSubject
    pedidos.push(libro); // Agregar el nuevo libro al array de pedidos
    this.pedidosSubject.next(pedidos); // Emitir el nuevo estado de pedidos a los suscriptores
  }

   // Obtener los pedidos del usuario
  getPedidos(): Observable<any[]> {
    return this.pedidosSubject.asObservable();
  }

  login(email: string, password: string) {
    console.log('Iniciando usuario:', email);
    const url = 'http://localhost:3001/login';
    const body = { email, password };
    return this.http.post(url, body);
  }
  

}
