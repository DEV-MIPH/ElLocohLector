import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  data: any = [];
  apiUrl = 'http://localhost:3000/libros'; // URL de tu API

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }
  
  
  getLibros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
