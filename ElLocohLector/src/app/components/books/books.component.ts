import { Component, ViewChild } from '@angular/core';
import { ConnectService } from '../../modules/lobby/services/connect.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSortModule, MatSnackBarModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, AfterViewInit {

  libros: any = [];
  librosSubscription?: Subscription;
  librosFiltrados: any = [];
  searchAuthor: string = '';
  searchTitle: string = '';
  displayedColumns: string[] = ['titulo', 'autor', 'editorial', 'categoria', 'edicion', 'cantidad'];
  isUserLoggedIn: boolean = false; // Suponemos que esta variable se actualiza según el estado de autenticación

  dataSource = new MatTableDataSource<any>(this.librosFiltrados);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private connectService: ConnectService, private cdr: ChangeDetectorRef, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.librosSubscription = this.connectService.getLibros().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.libros = response;
        this.librosFiltrados = response;
        this.dataSource.data = this.librosFiltrados; // Actualizar dataSource
      },
      error => {
        console.error('Error al obtener datos:', error);
        this.snackBar.open('Error al cargar los libros. Inténtelo nuevamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.librosSubscription?.unsubscribe();
  }

  filtrarLibros(): void {
    console.log('Filtrando libros');
    console.log('Autor:', this.searchAuthor);
    console.log('Título:', this.searchTitle);
    this.librosFiltrados = this.libros.filter((book: any) => {
      return book.Autor.toLowerCase().includes(this.searchAuthor.toLowerCase()) && book.titulo.toLowerCase().includes(this.searchTitle.toLowerCase());
    });
    console.log('Libros filtrados:', this.librosFiltrados);
    this.dataSource.data = this.librosFiltrados; // Actualizar dataSource
    this.cdr.detectChanges();
  }

  solicitarLibro(libro: any): void {
    console.log('Solicitando libro:', libro);
    // Aquí implementas la lógica para solicitar el libro
    // Por ejemplo, podrías llamar a un servicio que maneje las solicitudes
  }
}