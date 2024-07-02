import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConnectService } from '../../../modules/lobby/services/connect.service';
import { Subscription } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ejemplares',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule,MatIconModule,MatButtonModule],
  templateUrl: './ejemplares.component.html',
  styleUrl: './ejemplares.component.css'
})
export class EjemplaresComponent implements OnInit, AfterViewInit, OnDestroy {

  libros: any = [];
  librosSubscription?: Subscription;
  librosFiltrados: any = [];
  searchAuthor: string = '';
  searchTitle: string = '';
  displayedColumns: string[] = ['titulo', 'autor', 'editorial', 'categoria', 'edicion'];

  dataSource = new MatTableDataSource<any>(this.librosFiltrados);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private connectService: ConnectService, private cdr: ChangeDetectorRef, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.librosSubscription = this.connectService.getLibrosAdmin().subscribe(
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
}
