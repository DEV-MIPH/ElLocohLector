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

@Component({
  selector: 'app-addbookmodal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatAutocompleteModule,CommonModule ],
  templateUrl: './addbookmodal.component.html',
  styleUrl: './addbookmodal.component.css'
})
export class AddbookmodalComponent implements OnInit{
  nuevoLibro = {
    titulo_libro: '',
    autor: '',
    editorial: '',
    categoria: '',
    edicion: '',
  };

  autorControl = new FormControl();
  editorialControl = new FormControl();
  categoriaControl = new FormControl();
  edicionControl = new FormControl();

  filteredAutores!: Observable<string[]>;
  filteredEditoriales!: Observable<string[]>;
  filteredCategorias!: Observable<string[]>;
  filteredEdiciones!: Observable<string[]>;

  listaAutores: any = [];
  nombreAutores: string[] = [];
  listaEditoriales: any = [];
  nombreEditoriales: string[] = [];
  listaCategorias: any = [];
  nombreCategorias: string[] = [];
  listaEdiciones: any = [];
  nombreEdiciones: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddbookmodalComponent>,
    private connectService: ConnectService
  ) {}

  ngOnInit(): void {
    this.connectService.getAutores().subscribe(response => {
      this.listaAutores = response;
      console.log('Autores:', this.listaAutores);  // Verifica aquí
      this.getNombresAutores();
    });

    this.connectService.getEditoriales().subscribe(response => {
      this.listaEditoriales = response;
      this.getNombresEditoriales();
    });

    this.connectService.getCategorias().subscribe(response => {
      this.listaCategorias = response;
      this.getNombresCategorias();
    });

    this.connectService.getEdiciones().subscribe(response => {
      this.listaEdiciones = response;
      this.getNombresEdiciones();
    });

    this.filteredAutores = this.autorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.nombreAutores))
    );
    this.filteredEditoriales = this.editorialControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.nombreEditoriales))
    );
    this.filteredCategorias = this.categoriaControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.nombreCategorias))
    );
    this.filteredEdiciones = this.edicionControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.nombreEdiciones))
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    const selectedAutor = this.listaAutores.find((autor: any) => {
      const nombreCompleto = autor.apellido_autor 
        ? `${autor.nombre_autor} ${autor.apellido_autor}` 
        : autor.nombre_autor;
      return nombreCompleto === this.autorControl.value;
    });

    console.log('Autor seleccionado:', selectedAutor);  // Verifica aquí

    const selectedEditorial = this.listaEditoriales.find((editorial: any) => editorial.nombre_editorial === this.editorialControl.value);
    const selectedCategoria = this.listaCategorias.find((categoria: any) => categoria.nombre_categoria === this.categoriaControl.value);
    const selectedEdicion = this.listaEdiciones.find((edicion: any) => edicion.edicion === this.edicionControl.value);

    this.nuevoLibro.autor = selectedAutor ? selectedAutor.id_autor : null;
    this.nuevoLibro.editorial = selectedEditorial ? selectedEditorial.id_editorial : null;
    this.nuevoLibro.categoria = selectedCategoria ? selectedCategoria.id_categoria : null;
    this.nuevoLibro.edicion = selectedEdicion ? selectedEdicion.id_edicion : null;

    console.log('Enviando libro:', this.nuevoLibro);
    this.connectService.agregarLibro(this.nuevoLibro).subscribe(
      response => {
        console.log('Libro agregado:', response);
        this.dialogRef.close(response);
      },
      error => {
        console.error('Error al agregar libro:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getNombresAutores(): void {
    this.nombreAutores = this.listaAutores.map((autor: any) => {
      const nombreCompleto = autor.apellido_autor 
        ? `${autor.nombre_autor} ${autor.apellido_autor}` 
        : autor.nombre_autor;
      console.log('Nombre completo del autor:', nombreCompleto);
      return nombreCompleto;
    });
  }

  getNombresEditoriales(): void {
    this.nombreEditoriales = this.listaEditoriales.map((editorial: any) => editorial.nombre_editorial);
  }

  getNombresCategorias(): void {
    this.nombreCategorias = this.listaCategorias.map((categoria: any) => categoria.nombre_categoria);
  }

  getNombresEdiciones(): void {
    this.nombreEdiciones = this.listaEdiciones.map((edicion: any) => edicion.edicion);
  }
}
