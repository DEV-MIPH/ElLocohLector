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

interface Ejemplar {
  nombre_libro: string;
  nombre_autor: string;
  nombre_categoria: string;
  nombre_editorial: string;
  edicion: string;
  descripcion: string;
}

@Component({
  selector: 'app-addejemplar',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  templateUrl: './addejemplar.component.html',
  styleUrl: './addejemplar.component.css'
})
export class AddejemplarComponent implements OnInit {
  nuevoEjemplar: Ejemplar = {
    nombre_libro: '',
    nombre_autor: null,
    nombre_categoria: null,
    nombre_editorial: null,
    edicion: null,
    descripcion: '',
  };

  tituloControl = new FormControl();
  autorControl = new FormControl();
  editorialControl = new FormControl();
  categoriaControl = new FormControl();
  edicionControl = new FormControl();

  filteredTitulos!: Observable<string[]>;
  filteredAutores!: Observable<string[]>;
  filteredEditoriales!: Observable<string[]>;
  filteredCategorias!: Observable<string[]>;
  filteredEdiciones!: Observable<string[]>;

  listaTitulos: string[] = [];
  listaAutores: string[] = [];
  listaEditoriales: string[] = [];
  listaCategorias: string[] = [];
  listaEdiciones: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddejemplarComponent>,
    private connectService: ConnectService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();

    this.filteredTitulos = this.tituloControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.listaTitulos))
    );
    this.filteredAutores = this.autorControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.listaAutores))
    );
    this.filteredEditoriales = this.editorialControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.listaEditoriales))
    );
    this.filteredCategorias = this.categoriaControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.listaCategorias))
    );
    this.filteredEdiciones = this.edicionControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.listaEdiciones))
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  async onSubmit(): Promise<void> {
    this.nuevoEjemplar.nombre_libro = this.tituloControl.value;
    this.nuevoEjemplar.nombre_autor = this.autorControl.value;
    this.nuevoEjemplar.nombre_editorial = this.editorialControl.value;
    this.nuevoEjemplar.nombre_categoria = this.categoriaControl.value;
    this.nuevoEjemplar.edicion = this.edicionControl.value;

    this.submitEjemplar();
  }

  submitEjemplar(): void {
    this.connectService.agregarEjemplar(this.nuevoEjemplar).subscribe((response) => {
      console.log('Ejemplar añadido:', response);
      this.dialogRef.close();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async obtenerDatos(): Promise<void> {
    this.connectService.getLibros().subscribe((response) => {
      this.listaTitulos = response.map((libro: any) => libro.titulo);
    });
    
    this.connectService.getAutores().subscribe((response) => {
      this.listaAutores = response.map((autor: any) => `${autor.nombre_autor} ${autor.apellido_autor}`);
    });

    this.connectService.getEditoriales().subscribe((response) => {
      this.listaEditoriales = response.map((editorial: any) => editorial.nombre_editorial);
    });

    this.connectService.getCategorias().subscribe((response) => {
      this.listaCategorias = response.map((categoria: any) => categoria.nombre_categoria);
    });

    this.connectService.getEdiciones().subscribe((response) => {
      this.listaEdiciones = response.map((edicion: any) => edicion.edicion);
    });
  }
}
