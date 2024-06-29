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
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { EditbookmodalComponent } from '../editbookmodal/editbookmodal.component';


@Component({
  selector: 'app-admbooks',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule,MatIconModule,MatButtonModule,EditbookmodalComponent],
  templateUrl: './admbooks.component.html',
  styleUrl: './admbooks.component.css'
})
export class AdmbooksComponent implements OnInit, AfterViewInit, OnDestroy  {
  libros: any = [];
  librosSubscription?: Subscription;
  librosFiltrados: any = [];
  searchAuthor: string = '';
  searchTitle: string = '';
  displayedColumns: string[] = ['titulo', 'autor', 'editorial', 'categoria', 'edicion', 'cantidad', 'acciones'];

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

  /*Manejar MODAL EDITAR libro*/
  /*Manejar MODAL EDITAR libro*/
  
  editarLibro(libro: any): void {
    console.log('Editar libro:', libro);
    const dialogRef = this.dialog.open(EditbookmodalComponent, {
      width: '400px',
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar la actualización del libro con los datos editados
        const index = this.libros.findIndex((b: any) => b.id === result.id);
        if (index !== -1) {
          this.libros[index] = result;
          this.filtrarLibros(); // Actualizar la tabla después de la edición
        }
        console.log('Libro editado:', result);
      }
    });
  }

  
}
