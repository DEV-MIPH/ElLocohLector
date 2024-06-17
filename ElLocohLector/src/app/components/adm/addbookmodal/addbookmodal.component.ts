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
  nombre_autor: string;
  apellido_autor: string;
}

interface Editorial {
  nombre_editorial: string;
}

interface Categoria {
  nombre_categoria: string;
}

interface Edicion {
  edicion: string;
}

interface Libro {
  titulo_libro: string;
  autor: number;
  editorial: number;
  categoria: number;
  edicion: number;
}


@Component({
  selector: 'app-addbookmodal',
  standalone: true,
  imports: [MatFormFieldModule, MatTooltipModule, MatIcon, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatAutocompleteModule, CommonModule],
  templateUrl: './addbookmodal.component.html',
  styleUrl: './addbookmodal.component.css'
})
export class AddbookmodalComponent implements OnInit {

  nuevoLibro: Libro = {
    titulo_libro: '',
    autor: 0,
    editorial: 0,
    categoria: 0,
    edicion: 0
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
  ) { }

  ngOnInit(): void {



    this.obtenerDatos();

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

    const selectedEditorial = this.listaEditoriales.find((editorial: Editorial) => editorial.nombre_editorial === this.editorialControl.value);
    const selectedCategoria = this.listaCategorias.find((categoria: Categoria) => categoria.nombre_categoria === this.categoriaControl.value);
    const selectedEdicion = this.listaEdiciones.find((edicion: Edicion) => edicion.edicion === this.edicionControl.value);

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

    this.validarTodo(this.autorControl.value, this.editorialControl.value, this.categoriaControl.value, this.edicionControl.value);


    this.submitBook();
    console.log('Libro:', this.nuevoLibro);
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
    this.nombreAutores = this.listaAutores.map((autor: Autor) => {
      const nombreCompleto = autor.apellido_autor
        ? `${autor.nombre_autor} ${autor.apellido_autor}`
        : autor.nombre_autor;
      console.log('Nombre completo del autor:', nombreCompleto);
      return nombreCompleto;
    });
  }

  getNombresEditoriales(): void {
    this.nombreEditoriales = this.listaEditoriales.map((editorial: Editorial) => editorial.nombre_editorial);
  }

  getNombresCategorias(): void {
    this.nombreCategorias = this.listaCategorias.map((categoria: Categoria) => categoria.nombre_categoria);
  }

  getNombresEdiciones(): void {
    this.nombreEdiciones = this.listaEdiciones.map((edicion: Edicion) => edicion.edicion);
  }

  //Esta funcion toma solamente el nombre de la lista de autores y lo itera
  buscarAutores(nombreBuscado: string, apellidoBuscado: string | null): boolean {
    // Iterar sobre la lista de autores
    for (let autor of this.listaAutores) {
      // Verificar si el nombre y apellido coinciden
      if (autor.nombre_autor == nombreBuscado && autor.apellido_autor === apellidoBuscado) {
        return true; // Retornar true si se encuentra una coincidencia exacta
      }
    }
    return false; // Retornar false si no se encuentra ninguna coincidencia
  }

  //Esta funcion toma solamente el nombre de la lista de categoria y lo itera
  buscarCategoria(categoriaBuscada: string): boolean {
    for (let categoria of this.listaCategorias) {
      if (categoria.nombre_categoria == categoriaBuscada) {
        return true;
      }
    }
    return false;
  }

  //Esta funcion toma solamente el nombre de la lista de editorial y lo itera
  buscarEditorial(editorialBuscada: string): boolean {
    for (let editorial of this.listaEditoriales) {
      if (editorial.nombre_editorial == editorialBuscada) {
        return true;
      }
    }
    return false;
  }

  //Esta funcion toma solamente el nombre de la lista de edicion y lo itera
  buscarEdicion(edicionBuscada: string): boolean {
    for (let edicion of this.listaEdiciones) {
      console.log('Edicion:', edicion.edicion + " EdicionBuscada: " + edicionBuscada);
      if (edicion.edicion == edicionBuscada) {
        console.log('edicion encontrada:', edicion.edicion);
        return true;
      }
    }
    console.log('edicion no encontrada:', edicionBuscada);
    return false;
  }

  async obtenerDatosAutor(): Promise<void> {
    await this.connectService.getAutores().subscribe(response => {
      this.listaAutores = response;
      console.log('Autores:', this.listaAutores);  // Verifica aquí
      this.getNombresAutores();
    });
  }

  async obtenerDatosEditoriales(): Promise<void> {
    await this.connectService.getEditoriales().subscribe(response => {
      this.listaEditoriales = response;
      this.getNombresEditoriales();
    });
  }

  async obtenerDatosCategorias(): Promise<void> {
    await this.connectService.getCategorias().subscribe(response => {
      this.listaCategorias = response;
      this.getNombresCategorias();
    });
  }

  async obtenerDatosEdiciones(): Promise<void> {
    await this.connectService.getEdiciones().subscribe(response => {
      this.listaEdiciones = response;
      this.getNombresEdiciones();
    });
  }

  async obtenerDatos(): Promise<void> {
    this.obtenerDatosAutor();
    this.obtenerDatosEditoriales();
    this.obtenerDatosCategorias();
    this.obtenerDatosEdiciones();
  }

  async validarTodo(autor: string, editorial: string, categoria: string, edicion: string): Promise<void> {

    this.validarAutorSiExiste(autor);
    this.validarEditorialSiExiste(editorial);
    this.validarCategoriaSiExiste(categoria);
    this.validarEdicionSiExiste(edicion);
    
    this.obtenerDatos();


    const selectedEditorial2 = this.listaEditoriales.find((editorial: any) => editorial.nombre_editorial === this.editorialControl.value);
    this.nuevoLibro.editorial = selectedEditorial2 ? selectedEditorial2.id_editorial : null;

    const selectedCategoria2 = this.listaCategorias.find((categoria: any) => categoria.nombre_categoria === this.categoriaControl.value);
    this.nuevoLibro.categoria = selectedCategoria2 ? selectedCategoria2.id_categoria : null;

    const selectedEdicion2 = this.listaEdiciones.find((edicion: any) => edicion.edicion === this.edicionControl.value);
    this.nuevoLibro.edicion = selectedEdicion2 ? selectedEdicion2.id_edicion : null;
  }

  validarAutorSiExiste(autor: any): void {

  }

  async validarEditorialSiExiste(editorial: string): Promise<void> {
    if (editorial !== '') {
      const editorialNombre = this.editorialControl.value;
      const editorialNueva: Editorial = {
        nombre_editorial: editorialNombre
      };

      if (!this.buscarEditorial(editorialNueva.nombre_editorial)) {
        console.log('Editorial no encontrada:', editorialNueva.nombre_editorial);

        try {
          // Agregar la nueva editorial y esperar a que se complete
          this.connectService.agregarEditorial(editorialNueva).subscribe(async (response) => {
            console.log('Editorial añadida:', response);
            console.log('Editorial añadida:', editorialNueva);

            // Obtener los datos actualizados de las editoriales y esperar a que se complete
            await this.obtenerDatosEditoriales();

            // Buscar la editorial en la lista actualizada
            
            console.log('Editorial nueva:', this.nuevoLibro.editorial);
          });

        } catch (error) {
          console.error('Error al agregar la editorial:', error);
        }
      }
    }
  }




  validarCategoriaSiExiste(categoria): void {
    if (categoria !== '') {
      let categoria = this.categoriaControl.value;
      const categoriaNueva: Categoria = {
        nombre_categoria: categoria
      }
      if (!this.buscarCategoria(categoriaNueva.nombre_categoria)) {
        console.log('Categoria no encontrada:', categoriaNueva);
        this.connectService.agregarCategoria(categoriaNueva)
          .subscribe(response => {
            console.log('Categoría añadida:', response);
          });

        this.obtenerDatosCategorias();
        const selectedCategoria = this.listaCategorias.find((categoria: Categoria) => categoria.nombre_categoria === this.categoriaControl.value);
        this.nuevoLibro.categoria = selectedCategoria ? selectedCategoria.id_categoria : null;
      }
      return;
    }
  }

  validarEdicionSiExiste(edicion): void {
    if (edicion !== '') {
      let edicion = this.edicionControl.value;
      const edicionNueva: Edicion = {
        edicion: edicion
      }
      if (!this.buscarEdicion(edicionNueva.edicion)) {
        console.log('Edición no encontrada:', edicionNueva);
        this.connectService.agregarEdicion(edicionNueva)
          .subscribe(response => {
            console.log('Edición añadida:', response);
          });

        this.obtenerDatosEdiciones();
        const selectedEdicion = this.listaEdiciones.find((edicion: Edicion) => edicion.edicion === this.edicionControl.value);
        this.nuevoLibro.edicion = selectedEdicion ? selectedEdicion.id_edicion : null;

      }
      return;
    }
  }





}
