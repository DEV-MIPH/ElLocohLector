import { Component, OnInit, ViewChild  } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface LibroPedido {
  titulo: string;
  autor: string;
  editorial: string;
}

@Component({
    selector: 'app-pedidos',
    standalone: true,
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.css',
    imports: [MatTableModule, MatPaginatorModule, MatSortModule, HeaderComponent, FooterComponent]
})
export class PedidosComponent implements OnInit{
  displayedColumns: string[] = ['titulo', 'autor', 'editorial'];
  dataSource = new MatTableDataSource<LibroPedido>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  agregarLibro(libro: LibroPedido) {
    this.dataSource.data = [...this.dataSource.data, libro];
  }
}
