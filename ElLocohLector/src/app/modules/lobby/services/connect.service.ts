import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

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

  constructor(private http: HttpClient) { }

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

  agregarCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCategorias, categoria);
  }

  agregarEditorial(editorial: any): Observable<any> {
    return this.http.post<any>(this.apiUrlEditoriales, editorial);
  }

  agregarEdicion(edicion: any): Observable<any> {
    return this.http.post<any>(this.apiUrlEdiciones, edicion);
  }

    // Agregar un libro al pedido
  solicitarLibro(libro: any): void {
    console.log('Libro solicitado:', libro);
    const pedidos = this.pedidosSubject.getValue();
    pedidos.push(libro);
    this.pedidosSubject.next(pedidos);
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
