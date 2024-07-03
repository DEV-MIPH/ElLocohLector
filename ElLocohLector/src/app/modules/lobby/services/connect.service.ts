import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


interface Editorial {
  nombre_editorial: string;
}

interface Categoria {
  nombre_categoria: string;
}

interface Edicion {
  nombre_edicion: string;
}

interface Autor {
  nombre_autor: string;
  apellido_autor: string;

}

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  data: any = [];
  apiUrl = 'http://localhost:3000/libros'; // URL de tu API
  apiUrlEjemplares = 'http://localhost:3000/ejemplares'; // URL de ejemplares
  pedidosSubject = new BehaviorSubject<any[]>([]); //para manejar los pedidos del usuario
  apiUrlAllBooks = 'http://localhost:3000/all_libros';
  apiUrlAutores = 'http://localhost:3000/autores';
  apiUrlCategorias = 'http://localhost:3000/categorias';
  apiUrlEditoriales = 'http://localhost:3000/editoriales';
  apiUrlEdiciones = 'http://localhost:3000/ediciones';
  apiUrlSendMail = 'http://localhost:3000/send-email';
  apiUrlAdmin = 'http://localhost:3000/librosadmin';
  apiAddUser = 'http://localhost:3000/addUser';
  apiGetAdmins = 'http://localhost:3000/getAdmins';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Inicialmente no logueado
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para actualizar el estado de inicio de sesión
  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  ngOnInit(): void {

  }

  getLibrosAdmin(): Observable<any> {
    return this.http.get<any>(this.apiUrlAdmin);
  }


  //funciones get para obtener url
  getLibros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrlAllBooks);
  }
  getAutores(): Observable<any> {
    return this.http.get<any>(this.apiUrlAutores);
  }
  getCategorias(): Observable<any> {
    return this.http.get<any>(this.apiUrlCategorias);
  }
  getEditoriales(): Observable<any> {
    return this.http.get<any>(this.apiUrlEditoriales);
  }
  getEdiciones(): Observable<any> {
    return this.http.get<any>(this.apiUrlEdiciones);
  }

  getAdmins(): Observable<any> {
    return this.http.get<any>(this.apiGetAdmins);
  }

  //Rescatar ejemplares
  getEjemplares(): Observable<any> {
    return this.http.get<any>(this.apiUrlEjemplares);
  }

  agregarLibro(libro: any): Observable<any> {
    console.log('Agregando libro connect service:', libro);
    return this.http.post<any>(this.apiUrl, libro);
  }

  agregarAutor(autor: any): Observable<any> {
    return this.http.post<any>(this.apiUrlAutores, autor);
  }

  agregarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.apiUrlCategorias, categoria);
  }

  agregarEditorial(editorial: Editorial): Observable<any> {
    console.log('Agregando editorial connect service:', editorial);
    return this.http.post<any>(this.apiUrlEditoriales, editorial);
  }

  agregarEdicion(edicion: any): Observable<any> {
    return this.http.post<any>(this.apiUrlEdiciones, edicion);
  }

  //Agregar ejemplares
  agregarEjemplar(ejemplar: any): Observable<any> {
    console.log('Agregando ejemplar connect service:', ejemplar);
    return this.http.post<any>(this.apiUrlEjemplares, ejemplar);
  }

  // Función para agregar un libro al pedido
  solicitarLibro(libro: any): void {
    console.log('Libro solicitado:', libro);
    const pedidos = this.pedidosSubject.getValue(); // Obtener los pedidos actuales del BehaviorSubject
    pedidos.push(libro); // Agregar el nuevo libro al array de pedidos
    this.pedidosSubject.next(pedidos); // Emitir el nuevo estado de pedidos a los suscriptores
  }

  // Obtener los pedidos del usuario
  getPedidos(): Observable<any[]> {
    return this.pedidosSubject.asObservable();
  }

  register(email: string, password: string) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <img src="https://firebasestorage.googleapis.com/v0/b/lokolector-8f586.appspot.com/o/images%2FlokoLector.jpeg?alt=media&token=09037e1e-f020-4a3b-af40-3b6a04d7bab3" alt="Logo de eLoKolector" style="display: block; margin: 0 auto; max-width: 200px; margin-bottom: 20px;">
      <h1 style="color: #333; text-align: center; margin-bottom: 20px;">¡Bienvenido a eLoKolector!</h1>
      <p style="text-align: center; margin-bottom: 20px;">Te damos la bienvenida a nuestra comunidad de lectores. A continuación, encontrarás tus credenciales de acceso:</p>
      <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
        <p><strong>Usuario:</strong> ${email}</p>
        <p><strong>Contraseña:</strong> ${password}</p>
      </div>
      <p style="text-align: center;">Gracias por unirte a nosotros. ¡Ya puedes solicitar libros!</p>
      <p style="text-align: center; margin-top: 20px;">Atentamente,<br>El equipo de eLoKolector</p>
    </div>
  `;
  

    console.log('Registrando usuario:', email);
    const to = email;
    const subject = 'Bienvenido a eLokolector';
    const text = 'Cuerpo del correo en texto plano';
    const body = {
      to: to,
      subject: subject,
      text: text,
      html: html
    };
    console.log('Body service:', body);
    this.http.post(this.apiUrlSendMail, body).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al enviar el correo:', error);
        // Manejar el error de manera adecuada
      }
    );

  }

  //Solicitud de registro de component form Registro
  solicitudRegistro(email: string, Telefono: string, NombreInstitucion : String , Comentario: String) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Solicitud de Registro</h1>
        <p style="margin-bottom: 10px;">¡Hola!</p>
        <p>Se ha recibido una nueva solicitud de registro con la siguiente información:</p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Teléfono:</strong> ${Telefono}</li>
            <li><strong>Nombre de la Institución:</strong> ${NombreInstitucion}</li>
            <li><strong>Comentario:</strong> ${Comentario}</li>
        </ul>
        <p>Por favor, revisa la solicitud y toma las acciones necesarias.</p>
        <p>¡Gracias!</p>
    </div>
  `;
    
  

    console.log('solicitud usuario:', email);
    const to = "elokolector@gmail.com";
    const subject = 'Bienvenido a eLokolector';
    const text = 'Cuerpo del correo en texto plano';
    const body = {
      to: to,
      subject: subject,
      text: text,
      html: html
    };
    console.log('Body service:', body);
    this.http.post(this.apiUrlSendMail, body).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al enviar el correo:', error);
        // Manejar el error de manera adecuada
      }
    );
    
  }

  //Mensaje de component Contacto
  mensajeContacto(email: string, NombreInstitucion : String , Comentario: String) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Mensaje de Contacto</h1>
        <p style="margin-bottom: 10px;">¡Hola!</p>
        <p>Se ha recibido un nuevo mensaje con la siguiente información:</p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Nombre de la Institución:</strong> ${NombreInstitucion}</li>
            <li><strong>Comentario:</strong> ${Comentario}</li>
        </ul>
        <p>Por favor, revisa el mensaje y toma las acciones necesarias.</p>
        <p>¡Gracias!</p>
    </div>
  `;

  console.log('Mensaje de:', email);
    const to = "elokolector@gmail.com";
    const subject = 'Bienvenido a eLokolector';
    const text = 'Cuerpo del correo en texto plano';
    const body = {
      to: to,
      subject: subject,
      text: text,
      html: html
    };
    console.log('Body service:', body);
    this.http.post(this.apiUrlSendMail, body).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al enviar el correo:', error);
        // Manejar el error de manera adecuada
      }
    );
    
  }

  registerInstitucion(nombre_usuario: any,email_usuario: any,fono_usuario: any,cel_usuario: any) {
    
    const body = {
      nombre_usuario: nombre_usuario,
      email_usuario: email_usuario,
      fono_usuario: fono_usuario,
      cel_usuario: cel_usuario,
      id_tipo_usuario: 2
    };
    console.log('Body service:', body);
    this.http.post(this.apiAddUser, body).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        console.log('Registrando usuario en bd:', email_usuario);
      },
      (error) => {
        console.error('Error al enviar el correo:', error);
      }
    );
    
  } 



}
