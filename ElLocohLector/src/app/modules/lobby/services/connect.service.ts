import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  data: any = [];
  apiUrl = 'http://localhost:3000/libros'; // URL de tu API
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
    return this.http.post<any>(this.apiUrl, libro); // La URL ya contiene 'libros'
  }

  login(email: string, password: string) {
    console.log('Iniciando usuario:', email);
    const url = 'http://localhost:3001/login';
    const body = { email, password };
    return this.http.post(url, body);
  }
  

}
