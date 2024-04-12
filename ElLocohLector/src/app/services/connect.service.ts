import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  data: any = [];
  apiUrl = 'http://localhost:8080/libros'; // URL de tu API

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.llamarApi().then(() => {
      for (const libro of this.data) {
        console.log(libro.titulo);
      }
    });

  }
  llamarApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.apiUrl).subscribe(
        response => {
          this.data = response;
          resolve();
        },
        error => {
          console.error('Error al obtener datos:', error);
          reject(error);
        }
      );
    });
  }
}
