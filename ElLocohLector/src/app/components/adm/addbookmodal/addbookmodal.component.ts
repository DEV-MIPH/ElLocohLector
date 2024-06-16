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
@Component({
  selector: 'app-addbookmodal',
  standalone: true,
  imports: [MatFormFieldModule, MatTooltipModule, MatIcon, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatAutocompleteModule,CommonModule ],
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
    //llamo a la funcion buscarAutores()
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

    if (!selectedAutor && this.nuevoAutor) {
      const nombreAutor = this.autorControl.value;
      this.connectService.agregarAutor({ nombre_autor: nombreAutor }).subscribe(response => {
        this.listaAutores.push(response); // Agrega el nuevo autor a la lista
        this.getNombresAutores(); // Actualiza la lista de nombres de autores
        this.nuevoLibro.autor = response.id_autor; // Actualiza el ID del libro con el nuevo ID de autor
        console.log('Nuevo autor agregado:', response); // Log para verificar el nuevo autor agregado
        this.submitBook();
      });
    } else if (!selectedEditorial && this.nuevaEditorial) {
      const nombreEditorial = this.editorialControl.value;
      this.connectService.agregarEditorial({ nombre_editorial: nombreEditorial }).subscribe(response => {
        this.listaEditoriales.push(response); // Agrega la nueva editorial a la lista
        this.getNombresEditoriales(); // Actualiza la lista de nombres de editoriales
        this.nuevoLibro.editorial = response.id_editorial; // Actualiza el ID del libro con el nuevo ID de editorial
        console.log('Nueva editorial agregada:', response); // Log para verificar la nueva editorial agregada
        this.submitBook();
      });
    } else if (!selectedCategoria && this.nuevaCategoria) {
      const nombreCategoria = this.categoriaControl.value;
      this.connectService.agregarCategoria({ nombre_categoria: nombreCategoria }).subscribe(response => {
        this.listaCategorias.push(response); // Agrega la nueva categoría a la lista
        this.getNombresCategorias(); // Actualiza la lista de nombres de categorías
        this.nuevoLibro.categoria = response.id_categoria; // Actualiza el ID del libro con el nuevo ID de categoría
        console.log('Nueva categoría agregada:', response); // Log para verificar la nueva categoría agregada
        this.submitBook();
      });
    } else if (!selectedEdicion && this.nuevaEdicion) {
      const nombreEdicion = this.edicionControl.value;
      this.connectService.agregarEdicion({ edicion: nombreEdicion }).subscribe(response => {
        this.listaEdiciones.push(response); // Agrega la nueva edición a la lista
        this.getNombresEdiciones(); // Actualiza la lista de nombres de ediciones
        this.nuevoLibro.edicion = response.id_edicion; // Actualiza el ID del libro con el nuevo ID de edición
        console.log('Nueva edición agregada:', response); // Log para verificar la nueva edición agregada
        this.submitBook();
      });
    } else {
      this.submitBook();
    }
  }
  submitBook(): void {
    this.connectService.agregarLibro(this.nuevoLibro).subscribe(response => {
      console.log('Libro añadido:', response);
      this.dialogRef.close();
    });
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

//Esta funcion toma solamente el nombre de la lista de autores y lo itera
  buscarAutores(nombreBuscado: string, apellidoBuscado: string): boolean {
    // Iterar sobre la lista de autores
    for (let autor of this.listaAutores) {
      // Verificar si el nombre y apellido coinciden
      if (autor.nombre_autor === nombreBuscado && autor.apellido_autor === apellidoBuscado) {
        return true; // Retornar true si se encuentra una coincidencia exacta
      }
    }
    return false; // Retornar false si no se encuentra ninguna coincidencia
  }
  
  //Esta funcion toma solamente el nombre de la lista de categoria y lo itera
  buscarCategoria(categoriaBuscada: string): boolean {
    for (let categoria of this.listaCategorias) {
      if (categoria.nombre_categoria === categoriaBuscada) {
        return true;
      }
    }
    return false;
  }

  //Esta funcion toma solamente el nombre de la lista de editorial y lo itera
  buscarEditorial(editorialBuscada: string): boolean {
    for (let editorial of this.listaEditoriales) {
      if (editorial.nombre_editorial === editorialBuscada) {
        return true;
      }
    }
    return false;
  }

  //Esta funcion toma solamente el nombre de la lista de edicion y lo itera
  buscarEdicion(edicionBuscada: string): boolean {
    for (let edicion of this.listaEdiciones) {
      if (edicion.edicion === edicionBuscada) {
        return true;
      }
    }
    return false;
  }
  
}
