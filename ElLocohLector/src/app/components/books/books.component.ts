import { Component, ViewChild } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
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

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, MatSortModule],
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

  dataSource = new MatTableDataSource<any>(this.librosFiltrados);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private connectService: ConnectService, private cdr: ChangeDetectorRef) { }

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
    this.dataSource.data = this.librosFiltrados;
    this.cdr.detectChanges();
  }

}