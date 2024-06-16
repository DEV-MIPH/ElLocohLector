import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConnectService } from '../../../modules/lobby/services/connect.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editbookmodal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatAutocompleteModule],
  templateUrl: './editbookmodal.component.html',
  styleUrl: './editbookmodal.component.css'
})

export class EditbookmodalComponent implements OnInit {
  libro: any;

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

  // Example data for autocomplete. Replace with actual data.
  allTitulos?: Subscription;
  nombreTitulos: any = [];
  listaTitulos: any = [];

  allAutores?: Subscription;
  nombreAutores: any = [];
  listaAutores: any = [];

  allEditoriales?: Subscription;
  nombreEditoriales: any = [];
  listaEditoriales: any = [];

  allCategorias?: Subscription;
  nombreCategorias: any = [];
  listaCategorias: any = [];

  allEdiciones?: Subscription;
  nombreEdiciones: any = [];
  listaEdiciones: any = [];

  constructor(
    private connectService: ConnectService, public dialogRef: MatDialogRef<EditbookmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.libro = { ...data }; // Pre-fill data
  }
  ngOnInit(): void {
    // Set initial values for controls
    this.tituloControl.setValue(this.libro.titulo);
    this.autorControl.setValue(this.libro.autor);
    this.editorialControl.setValue(this.libro.editorial);
    this.categoriaControl.setValue(this.libro.categoria);
    this.edicionControl.setValue(this.libro.edicion);

    // Initialize filtered options for each control
    this.filteredTitulos = this.tituloControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.nombreTitulos))
    );
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

    this.getAllDataForAutcomplete();
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.libro.titulo = this.tituloControl.value;
    this.libro.autor = this.autorControl.value;
    this.libro.editorial = this.editorialControl.value;
    this.libro.categoria = this.categoriaControl.value;
    this.libro.edicion = this.edicionControl.value;

    console.log('Libro editado:', this.libro);
    this.dialogRef.close(this.libro);
  }

  //funcion para autores

  getAllDataForAutcomplete(): void { 
    this.allAutores = this.connectService.getAutores().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.listaAutores = response;
        this.getNombresAutores();
        console.log('Autores:', this.nombreAutores);
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );

    //Suscribe de editoriales
    this.allEditoriales = this.connectService.getEditoriales().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.listaEditoriales = response;
        this.getNombresEditoriales();
        console.log('Editoriales:', this.nombreEditoriales);
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );

    //Suscribe de categorias
    this.allCategorias = this.connectService.getCategorias().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.listaCategorias = response;
        this.getNombresCategorias();
        console.log('Categorias:', this.nombreCategorias);
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );

    //Suscribe de ediciones
    this.allEdiciones = this.connectService.getEdiciones().subscribe(
      response => {
        console.log('Datos obtenidos:', response);
        this.listaEdiciones = response;
        this.getNombresEdiciones();
        console.log('Ediciones:', this.nombreEdiciones);
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );

  }

  getNombresAutores(): void {
    for (let autor of this.listaAutores) {
      if(autor.apellido_autor == null){
        this.nombreAutores.push(autor.nombre_autor)
      }else{
        this.nombreAutores.push(autor.nombre_autor + " " + autor.apellido_autor)
      }
     
    }
  };

  //funcion para editorial (columna nombre_editorial)
  getNombresEditoriales(): void {
    for (let editorial of this.listaEditoriales) {
      this.nombreEditoriales.push(editorial.nombre_editorial);
    }
  }

  //funcion para categorias (columna nombre_categoria)
  getNombresCategorias(): void {
    for (let categoria of this.listaCategorias) {
      this.nombreCategorias.push(categoria.nombre_categoria);
    }
  }

  //funcion para edicion (columna edicion)
  getNombresEdiciones(): void {
    for (let edicion of this.listaEdiciones) {
      this.nombreEdiciones.push(edicion.edicion);
    }
  }
}
