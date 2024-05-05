import { Component } from '@angular/core';
import { ConnectService } from '../../modules/lobby/services/connect.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  
  libros: any = [];
  librosSubscription?: Subscription;

  constructor(private connectService: ConnectService) {}

  ngOnInit(): void {
    this.librosSubscription = this.connectService.getLibros().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.libros = response;
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  
  searchBooks(){
    console.log('Buscando libro...');
  }
}
