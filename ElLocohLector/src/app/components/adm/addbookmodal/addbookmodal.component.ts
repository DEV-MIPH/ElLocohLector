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
  autor: number | null;
  editorial: number | null;
  categoria: number | null;
  edicion: number | null;
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

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  async onSubmit(): Promise<void> {
    await this.validarTodos(
      this.autorControl.value,
      this.editorialControl.value,
      this.categoriaControl.value,
      this.edicionControl.value
    );

    const selectedEditorial = this.listaEditoriales.find(
      (editorial: Editorial) => editorial.nombre_editorial === this.editorialControl.value
    );
    const selectedCategoria = this.listaCategorias.find(
      (categoria: Categoria) => categoria.nombre_categoria === this.categoriaControl.value
    );
    const selectedEdicion = this.listaEdiciones.find(
      (edicion: Edicion) => edicion.edicion === this.edicionControl.value
    );

    const selectedAutor = this.listaAutores.find((autor: Autor) => {
      const nombreCompleto = autor.apellido_autor
        ? `${autor.nombre_autor} ${autor.apellido_autor}`
        : autor.nombre_autor;
      return nombreCompleto === this.autorControl.value;
    });

    this.nuevoLibro.autor = selectedAutor ? selectedAutor.id_autor : null;
    this.nuevoLibro.editorial = selectedEditorial ? selectedEditorial.id_editorial : null;
    this.nuevoLibro.categoria = selectedCategoria ? selectedCategoria.id_categoria : null;
    this.nuevoLibro.edicion = selectedEdicion ? selectedEdicion.id_edicion : null;

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
    this.nombreEdiciones = this.listaEdiciones.map((edicion: Edicion) => edicion.edicion);
  }

  buscarAutores(nombreBuscado: string, apellidoBuscado: string | null): boolean {
    return this.listaAutores.some(
      (autor: Autor) =>
        autor.nombre_autor === nombreBuscado && autor.apellido_autor === apellidoBuscado
    );
  }

  buscarCategoria(categoriaBuscada: string): boolean {
    return this.listaCategorias.some(
      (categoria: Categoria) => categoria.nombre_categoria === categoriaBuscada
    );
  }

  buscarEditorial(editorialBuscada: string): boolean {
    return this.listaEditoriales.some(
      (editorial: Editorial) => editorial.nombre_editorial === editorialBuscada
    );
  }

  buscarEdicion(edicionBuscada: string): boolean {
    return this.listaEdiciones.some(
      (edicion: Edicion) => edicion.edicion === edicionBuscada
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

  async validarTodos(
    autor: string,
    editorial: string,
    categoria: string,
    edicion: string
  ): Promise<void> {
    await Promise.all([
      this.validarAutorSiExiste(autor),
      this.validarEditorialSiExiste(editorial),
      this.validarCategoriaSiExiste(categoria),
      this.validarEdicionSiExiste(edicion),
    ]);
  }

  async validarAutorSiExiste(autor: string): Promise<void> {
    if (autor !== '') {
      const [nombreAutor, apellidoAutor] = autor.split(' ');
      const autorNuevo = !this.buscarAutores(nombreAutor, apellidoAutor);

      this.nuevoAutor = autorNuevo;

      if (this.nuevoAutor) {
        const autorNuevo: Autor = {
          id_autor: 0,
          nombre_autor: nombreAutor,
          apellido_autor: apellidoAutor,
        };
        await new Promise<void>((resolve, reject) => {
          this.connectService.agregarAutor(autorNuevo).subscribe(
            (response) => {
              console.log('Autor añadido:', response);
              this.obtenerDatosAutor();
              resolve();
            },
            (error) => {
              console.error('Error al añadir autor:', error);
              reject();
            }
          );
        });
      }
    }
  }

  async validarEditorialSiExiste(editorial: string): Promise<void> {
    if (editorial !== '') {
      this.nuevaEditorial = !this.buscarEditorial(editorial);

      if (this.nuevaEditorial) {
        const editorialNueva: Editorial = {
          id_editorial: 0,
          nombre_editorial: editorial,
        };
        await new Promise<void>((resolve, reject) => {
          this.connectService.agregarEditorial(editorialNueva).subscribe(
            (response) => {
              console.log('Editorial añadida:', response);
              this.obtenerDatosEditoriales();
              resolve();
            },
            (error) => {
              console.error('Error al añadir editorial:', error);
              reject();
            }
          );
        });
      }
    }
  }

  async validarCategoriaSiExiste(categoria: string): Promise<void> {
    if (categoria !== '') {
      this.nuevaCategoria = !this.buscarCategoria(categoria);

      if (this.nuevaCategoria) {
        const categoriaNueva: Categoria = {
          id_categoria: 0,
          nombre_categoria: categoria,
        };
        await new Promise<void>((resolve, reject) => {
          this.connectService.agregarCategoria(categoriaNueva).subscribe(
            (response) => {
              console.log('Categoría añadida:', response);
              this.obtenerDatosCategorias();
              resolve();
            },
            (error) => {
              console.error('Error al añadir categoría:', error);
              reject();
            }
          );
        });
      }
    }
  }

  async validarEdicionSiExiste(edicion: string): Promise<void> {
    if (edicion !== '') {
      this.nuevaEdicion = !this.buscarEdicion(edicion);

      if (this.nuevaEdicion) {
        const edicionNueva: Edicion = {
          id_edicion: 0,
          edicion: edicion,
        };
        await new Promise<void>((resolve, reject) => {
          this.connectService.agregarEdicion(edicionNueva).subscribe(
            (response) => {
              console.log('Edición añadida:', response);
              this.obtenerDatosEdiciones();
              resolve();
            },
            (error) => {
              console.error('Error al añadir edición:', error);
              reject();
            }
          );
        });
      }
    }
  }
}
