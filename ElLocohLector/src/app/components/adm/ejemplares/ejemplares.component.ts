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
import { AddejemplarComponent } from '../addejemplar/addejemplar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ejemplares',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSelectModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule,MatIconModule,MatButtonModule,AddejemplarComponent, MatInputModule],
  templateUrl: './ejemplares.component.html',
  styleUrl: './ejemplares.component.css'
})
export class EjemplaresComponent implements OnInit, AfterViewInit, OnDestroy {

  libros: any = [];
  librosSubscription?: Subscription;
  librosFiltrados: any = [];
  searchAuthor: string = '';
  searchTitle: string = '';
  displayedColumns: string[] = ['Ejemplar', 'titulo', 'autor', 'editorial', 'categoria', 'edicion', 'estado', 'usuario','id_pedido', 'fecha'];

  dataSource = new MatTableDataSource<any>(this.librosFiltrados);
  estados: string[] = []; 
  emails: string[] = []; 
  isEdited: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private connectService: ConnectService, private cdr: ChangeDetectorRef, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.librosSubscription = this.connectService.getEjemplares().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.libros = response;
        this.librosFiltrados = response;
        this.dataSource.data = this.librosFiltrados; // Actualizar dataSource
      },
      error => {
        console.error('Error al obtener datos:', error);
        this.snackBar.open('Error al cargar los ejemplares. Inténtelo nuevamente.', 'Cerrar', {
          duration: 3000,
        });
        }
    );
   // Cargar la lista de usuarios
    this.connectService.getUsuarios().subscribe(
      response => {
        console.log('Usuarios obtenidos:', response);
        this.emails = response.map((usuario: any) => usuario.email_usuario);
        console.log('Emails:', this.emails);
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
     // Cargar la lista de estados
     this.connectService.getEstados().subscribe(
      response => {
        console.log('Estados obtenidos:', response);
        this.estados = response.map((estado: any) => estado.nombre_estado);
      },
      error => {
        console.error('Error al obtener estados:', error);
      }
    );
  }
  
  //Funcion para saber si un ejemplar fue editado asociado a Estado y Usuario
  markAsEdited(ejemplar: any): void {
    ejemplar.edited = true;
    this.isEdited = true;
  }

  guardarDatos(): void {
    const ejemplaresEditados = this.librosFiltrados.filter((ejemplar: any) => ejemplar.edited);
    if (ejemplaresEditados.length > 0) {
      ejemplaresEditados.forEach(ejemplar => {
        this.actualizarEjemplar(ejemplar);
      });
    }console.log('Ejemplares editados:', ejemplaresEditados);
  }

  //Actualiza el ejemplar con los nuevos datos
  actualizarEjemplar(ejemplar: any): void {
    console.log('Actualizar ejemplar:', ejemplar);
    this.connectService.actualizarEjemplar(ejemplar).subscribe(
      response => {
        console.log('Ejemplar actualizado:', response);
        this.snackBar.open('Ejemplar actualizado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        ejemplar.edited = false;
        this.isEdited = this.librosFiltrados.some((e: any) => e.edited);
      },
      error => {
        console.error('Error al actualizar ejemplar:', error);
        this.snackBar.open('Error al actualizar el ejemplar. Inténtelo nuevamente.', 'Cerrar', {
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
    this.librosFiltrados = this.libros.filter((ejemplar: any) => {
      return ejemplar.Autor.toLowerCase().includes(this.searchAuthor.toLowerCase()) && ejemplar.titulo.toLowerCase().includes(this.searchTitle.toLowerCase());
    });
    console.log('Ejemplares filtrados:', this.librosFiltrados);
    this.dataSource.data = this.librosFiltrados; // Actualizar dataSource
    this.cdr.detectChanges();
  }

  //ESTO ES NUEVO
  updateEstado(ejemplar: any): void { 
    // Lógica para actualizar el estado del libro
    console.log('Actualizar estado:', ejemplar);
  }

  updateUsuario(ejemplar: any): void {
    // Lógica para actualizar el usuario del libro
    console.log('Actualizar usuario:', ejemplar);
  }

  openAddEjemplarModal(): void {
    // Lógica para abrir el modal de añadir ejemplar
    console.log('Abrir modal para añadir ejemplar');
    const dialogRef = this.dialog.open(AddejemplarComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEjemplares();
      }
    });
  }

  private loadEjemplares(): void {
    this.librosSubscription = this.connectService.getEjemplares().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.libros = response;
        this.librosFiltrados = response;
        this.dataSource.data = this.librosFiltrados; // Actualizar dataSource
      },
      error => {
        console.error('Error al obtener datos:', error);
        this.snackBar.open('Error al cargar los ejemplares. Inténtelo nuevamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

}
