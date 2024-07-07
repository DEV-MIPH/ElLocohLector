import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ConnectService } from '../../modules/lobby/services/connect.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



interface Pedido {
  nombre_libro: string;
  autor: string;
  editorial: string;
  edicion: string;
  correo: string;
  fecha: string;
  cantidad: number;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  imports: [MatSnackBarModule, MatButtonModule, MatTooltip, MatTableModule, MatPaginatorModule, MatSortModule, HeaderComponent, FooterComponent]
})





export class PedidosComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['titulo', 'autor', 'editorial', 'edicion', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  private pedidosSubscription?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pedidos: any[] = [];
  constructor(private connectService: ConnectService, private snackBar: MatSnackBar, private router: Router) { }

  email: string = '';

  user: number;

  pedidosEnviar: Pedido[] = [];

  idPedido: string = '';


  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.pedidosSubscription = this.connectService.getPedidos().subscribe(
      pedidos => {
        console.log('Pedidos obtenidos:', pedidos);
        this.pedidos = pedidos; // Actualiza el arreglo local de pedidos
        this.dataSource.data = this.pedidos; // Actualiza la fuente de datos del MatTableDataSource
        this.dataSource.paginator = this.paginator; // Asigna el paginador al MatTableDataSource
      },
      error => {
        console.error('Error al obtener pedidos:', error);
      }
    );
    this.contarLibros();
  }

  ngOnDestroy(): void {
    if (this.pedidosSubscription) {
      this.pedidosSubscription.unsubscribe(); // Desuscribe para evitar memory leaks
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  solicitarLibro(libro: any): void {
    console.log('Libro solicitado:', libro);
    this.connectService.solicitarLibro(libro);

    this.snackBar.open('Pedido solicitado', 'Cerrar', {
      duration: 3000,
    }).afterDismissed().subscribe(() => {
      this.router.navigate(['/lobby']); // Redirige al componente principal /lobby
    });
  }

  eliminarPedido(libro: any): void {
    this.connectService.eliminarPedido(libro);
    this.pedidos = this.pedidos.filter(p => p !== libro);
    this.dataSource.data = this.pedidos;
    this.snackBar.open('Libro eliminado del pedido.', 'Cerrar', {
      duration: 3000,
    });
  }

  solicitarPedido(): void {
    let pedido: Subscription;
    try {
        console.log('Email antes de solicitar pedido:', this.email);
        pedido = this.connectService.postPedido(this.email).subscribe(
            response => {
                this.snackBar.open('Pedido solicitado', 'Cerrar', {});
                
                this.idPedido = response 
                console.log('ID del pedido:', this.idPedido);
                
                this.connectService.correoConPedidos(this.pedidosEnviar,this.idPedido);
                this.connectService.limpiarPedidos();
                console.log('Respuesta del servidor:', response);
            },
            error => {
                this.snackBar.open('Error al solicitar pedido al servidor', 'Cerrar', {});
                console.error('Error en la respuesta del servidor:', error);
            }
        );
    } catch (error) {
        console.error('Error al solicitar pedido:', error);
    }
}

  obtenerFechaFormateada(): string {
    const fechaActual = new Date();
    const opcionesFecha: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFecha) + ' a las ' +
      fechaActual.toLocaleTimeString('es-ES', opcionesHora);

    return fechaFormateada;
  }


  contarLibros(): void {
    const librosMap = new Map<string, number>();



    // Crear una clave única para cada libro usando sus propiedades
    const crearClaveLibro = (libro: any): string => {
      return `${libro.titulo}|${libro.Autor}|${libro.Editorial}|${libro.edicion}`;
    };

    // Contar la cantidad de cada libro
    for (const libro of this.pedidos) {
      const clave = crearClaveLibro(libro);
      if (librosMap.has(clave)) {
        librosMap.set(clave, librosMap.get(clave)! + 1);
      } else {
        librosMap.set(clave, 1);
      }
    }

    // Crear un pedido por cada libro diferente
    this.pedidosEnviar = []; // Reiniciar la lista de pedidos a enviar

    for (const [clave, cantidad] of librosMap.entries()) {
      const [nombre_libro, autor, editorial, edicion] = clave.split('|');
      const pedido: Pedido = {
        nombre_libro: nombre_libro,
        autor: autor,
        editorial: editorial,
        edicion: edicion,
        correo: this.email,
        fecha: this.obtenerFechaFormateada(),
        cantidad: cantidad
      };

      this.pedidosEnviar.push(pedido);
    }

    console.log('Pedidos a enviar:', this.pedidosEnviar);
  }



}
