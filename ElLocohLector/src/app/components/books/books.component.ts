import { Component, ViewChild, OnDestroy } from '@angular/core';
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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSortModule, MatSnackBarModule,MatButtonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy  {

  libros: any = [];
  librosSubscription?: Subscription;
  librosFiltrados: any = [];
  searchAuthor: string = '';
  searchTitle: string = '';
  displayedColumns: string[] = ['titulo', 'autor', 'editorial', 'categoria', 'edicion', 'cantidad'];
 

  dataSource = new MatTableDataSource<any>(this.librosFiltrados);
  isLoggedIn: boolean = false; // Variable para almacenar el estado de inicio de sesión
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private connectService: ConnectService, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar, private authService: AuthService) { }

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
     // Suscripción para obtener el estado de inicio de sesión
  this.connectService.isLoggedIn$.subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
    if (this.isLoggedIn) {
      this.displayedColumns.push('solicitar');
    }
  });
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
    if (this.isLoggedIn) {
      console.log('Libro solicitado:', libro);
      this.connectService.solicitarLibro(libro);
      this.snackBar.open('Libro solicitado exitosamente.', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Debe iniciar sesión para solicitar libros.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  updateDisplayedColumns(): void {
    if (this.isLoggedIn) {
      if (!this.displayedColumns.includes('solicitar')) {
        this.displayedColumns.push('solicitar');
      }
    } else {
      this.displayedColumns = this.displayedColumns.filter(column => column !== 'solicitar');
    }
  }
}