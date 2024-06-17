import { Component, OnInit, ViewChild, OnDestroy   } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { ConnectService } from '../../modules/lobby/services/connect.service';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-pedidos',
    standalone: true,
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.css',
    imports: [MatSnackBarModule,MatButtonModule,MatTableModule, MatPaginatorModule, MatSortModule, HeaderComponent, FooterComponent]
})
export class PedidosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['titulo', 'autor', 'editorial'];
  dataSource = new MatTableDataSource<any>([]);
  
  private pedidosSubscription?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private connectService: ConnectService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.pedidosSubscription = this.connectService.getPedidos().subscribe(
      pedidos => {
        console.log('Pedidos obtenidos:', pedidos);
        this.dataSource.data = pedidos;
      },
      error => {
        console.error('Error al obtener pedidos:', error);
      }
    );
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.pedidosSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  solicitarLibro(libro: any): void {
    console.log('Libro solicitado:', libro);
    this.connectService.solicitarLibro(libro);
    this.snackBar.open('Libro solicitado exitosamente.', 'Cerrar', {
      duration: 3000,
    });
  }
}
