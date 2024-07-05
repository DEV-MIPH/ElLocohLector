import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConnectService } from '../../../modules/lobby/services/connect.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

interface Autor {
  id_autor: number;
  nombre_autor: string;
  apellido_autor: string;
}

interface Editorial {
  id_editorial: number;
  nombre_editorial: string;
}

interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
}

interface Edicion {
  id_edicion: number;
  edicion: string;
}

interface Libro {
  titulo_libro: string;
  autor: string | null;
  editorial: string | null;
  categoria: string | null;
  edicion: string | null;
}

@Component({
  selector: 'app-addbookmodal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTooltipModule,
    MatIcon,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  templateUrl: './addbookmodal.component.html',
  styleUrls: ['./addbookmodal.component.css'],
})
export class AddbookmodalComponent implements OnInit {
  nuevoLibro: Libro = {
    titulo_libro: '',
    autor: null,
    editorial: null,
    categoria: null,
    edicion: null,
  };

  autorControl = new FormControl();
  editorialControl = new FormControl();
  categoriaControl = new FormControl();
  edicionControl = new FormControl();

  filteredAutores!: Observable<string[]>;
  filteredEditoriales!: Observable<string[]>;
  filteredCategorias!: Observable<string[]>;
  filteredEdiciones!: Observable<string[]>;

  listaAutores: Autor[] = [];
  nombreAutores: string[] = [];
  listaEditoriales: Editorial[] = [];
  nombreEditoriales: string[] = [];
  listaCategorias: Categoria[] = [];
  nombreCategorias: string[] = [];
  listaEdiciones: Edicion[] = [];
  nombreEdiciones: string[] = [];

  nuevoAutor = false;
  nuevaEditorial = false;
  nuevaCategoria = false;
  nuevaEdicion = false;
  tooltipMessage: any;

  constructor(
    public dialogRef: MatDialogRef<AddbookmodalComponent>,
    private connectService: ConnectService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();

    this.filteredAutores = this.autorControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.nombreAutores))
    );
    this.filteredEditoriales = this.editorialControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.nombreEditoriales))
    );
    this.filteredCategorias = this.categoriaControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.nombreCategorias))
    );
    this.filteredEdiciones = this.edicionControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.nombreEdiciones))
    );
  }

  private _filter(value: string | null, options: string[]): string[] {
    if (value === null || value === undefined) {
      return options;
    }
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  async onSubmit(): Promise<void> {

    this.nuevoLibro.autor = this.autorControl.value;
    this.nuevoLibro.editorial = this.editorialControl.value;
    this.nuevoLibro.categoria = this.categoriaControl.value;
    this.nuevoLibro.edicion = this.edicionControl.value;

    this.submitBook();
  }

  submitBook(): void {
    this.connectService.agregarLibro(this.nuevoLibro).subscribe((response) => {
      console.log('Libro añadido:', response);
      this.dialogRef.close();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getNombresAutores(): void {
    this.nombreAutores = this.listaAutores.map((autor: Autor) => {
      const nombreCompleto = autor.apellido_autor
        ? `${autor.nombre_autor} ${autor.apellido_autor}`
        : autor.nombre_autor;
      return nombreCompleto;
    });
  }

  getNombresEditoriales(): void {
    this.nombreEditoriales = this.listaEditoriales.map(
      (editorial: Editorial) => editorial.nombre_editorial
    );
  }

  getNombresCategorias(): void {
    this.nombreCategorias = this.listaCategorias.map(
      (categoria: Categoria) => categoria.nombre_categoria
    );
  }

  getNombresEdiciones(): void {
    this.nombreEdiciones = this.listaEdiciones.map(
      (edicion: Edicion) => edicion.edicion
    );
  }


  async obtenerDatosAutor(): Promise<void> {
    this.connectService.getAutores().subscribe((response) => {
      this.listaAutores = response;
      this.getNombresAutores();
    });
  }

  async obtenerDatosEditoriales(): Promise<void> {
    this.connectService.getEditoriales().subscribe((response) => {
      this.listaEditoriales = response;
      this.getNombresEditoriales();
    });
  }

  async obtenerDatosCategorias(): Promise<void> {
    this.connectService.getCategorias().subscribe((response) => {
      this.listaCategorias = response;
      this.getNombresCategorias();
    });
  }

  async obtenerDatosEdiciones(): Promise<void> {
    this.connectService.getEdiciones().subscribe((response) => {
      this.listaEdiciones = response;
      this.getNombresEdiciones();
    });
  }

  async obtenerDatos(): Promise<void> {
    await this.obtenerDatosAutor();
    await this.obtenerDatosEditoriales();
    await this.obtenerDatosCategorias();
    await this.obtenerDatosEdiciones();
  }

}
