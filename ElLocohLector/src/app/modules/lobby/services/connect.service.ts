import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../auth.service';

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

interface Email {
  email: string;
}

interface Pedido {
  email_usuario: string;
}

interface PedidoUsuario {
  nombre_libro: string;
  autor: string;
  editorial: string;
  edicion: string;
  correo: string;
  fecha: string;
  cantidad: number;
}

interface EditEjemplar {
  id_ejemplar: number;
  estado: string;
  id_pedido: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  data: any = [];
  apiUrl = 'https://ellocohlector-connect.onrender.com/libros'; // URL de tu API
  apiUrlEjemplares = 'https://ellocohlector-connect.onrender.com/ejemplares'; // URL de ejemplares
  apiUrlUsuarios = 'https://ellocohlector-connect.onrender.com/nombres_usuarios'; // URL para obtener los usuarios
  apiUrlEstado = 'https://ellocohlector-connect.onrender.com/estados'; // URL para obtener los estados
  pedidosSubject = new BehaviorSubject<any[]>([]); //para manejar los pedidos del usuario
  apiUrlAllBooks = 'https://ellocohlector-connect.onrender.com/all_libros';
  apiUrlAutores = 'https://ellocohlector-connect.onrender.com/autores';
  apiUrlCategorias = 'https://ellocohlector-connect.onrender.com/categorias';
  apiUrlEditoriales = 'https://ellocohlector-connect.onrender.com/editoriales';
  apiUrlEdiciones = 'https://ellocohlector-connect.onrender.com/ediciones';
  apiUrlSendMail = 'https://ellocohlector-connect.onrender.com/send-email';
  apiUrlAdmin = 'https://ellocohlector-connect.onrender.com/librosadmin';
  apiAddUser = 'https://ellocohlector-connect.onrender.com/addUser';
  apiGetAdmins = 'https://ellocohlector-connect.onrender.com/getAdmins';
  apiGetUserByEmail = 'https://ellocohlector-connect.onrender.com/getUserIdByEmail';
  apiPostPedido = 'https://ellocohlector-connect.onrender.com/pedidoo';
  apiModificarEjemplar = 'https://ellocohlector-connect.onrender.com/modificarEjemplar';



  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Inicialmente no logueado
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    const savedPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    this.pedidosSubject.next(savedPedidos);

    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedInSubject.next(isLoggedIn);
      if (!isLoggedIn) {
        this.pedidosSubject.next([]);
        localStorage.removeItem('pedidos');
      }
    });
  }

  // Método para actualizar el estado de inicio de sesión
  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
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

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrlUsuarios);
  }

  getEstados(): Observable<any> {
    return this.http.get<any>(this.apiUrlEstado);
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

  //Actualizar Ejemplar con los campos Estado y Usuario
  actualizarEjemplar(ejemplar: any): Observable<any> {
    let ejemplarData: EditEjemplar ;
    ejemplarData = { id_ejemplar: ejemplar.Ejemplar, estado: ejemplar.Estado, id_pedido: ejemplar.id_pedido };
    console.log('Actualizando ejemplar:', ejemplarData);
    return this.http.post<any>(this.apiModificarEjemplar, ejemplarData);
  }

  // Función para agregar un libro al pedido
  solicitarLibro(libro: any): void {
    if (this.isLoggedInSubject.getValue()) {
      console.log('Libro solicitado:', libro);
      const pedidos = this.pedidosSubject.getValue(); // Obtener los pedidos actuales del BehaviorSubject
      pedidos.push(libro); // Agregar el nuevo libro al array de pedidos
      this.pedidosSubject.next(pedidos); // Emitir el nuevo estado de pedidos a los suscriptores
      localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Guardar en localStorage
    } else {
      console.error('Debe iniciar sesión para solicitar libros.');
    }
  }

  // Función para eliminar un libro del pedido
  eliminarPedido(libro: any): void {
    const pedidos = this.pedidosSubject.getValue(); // Obtener los pedidos actuales del BehaviorSubject
    const index = pedidos.findIndex(p => p === libro);
    if (index !== -1) {
      pedidos.splice(index, 1); // Eliminar el libro del array de pedidos
      this.pedidosSubject.next(pedidos); // Emitir el nuevo estado de pedidos a los suscriptores
      localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Guardar en localStorage
    }
  }

  // Función para limpiar los pedidos
  limpiarPedidos(): void {
    this.pedidosSubject.next([]); // Limpiar los pedidos del BehaviorSubject
    localStorage.removeItem('pedidos'); // Limpiar los pedidos de localStorage
  }

  // Obtener los pedidos del usuario
  getPedidos(): Observable<any[]> {
    return this.pedidosSubject.asObservable();
  }

  getUserByEmail(email: string): Observable<any> {
    let emailObject: Email;
    emailObject = { email };
    console.log('Obteniendo usuario por email:', email);
    return this.http.post<any>(this.apiGetUserByEmail, { email });
  }

  postPedido(correo: string): Observable<any> {
    let pedido: Pedido;
    pedido = { email_usuario: correo };
    console.log('Posteando pedido:', pedido);
    return this.http.post<any>(this.apiPostPedido, pedido);
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
  solicitudRegistro(email: string, Telefono: string, NombreInstitucion: String, Comentario: String) {
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
  mensajeContacto(email: string, NombreInstitucion: String, Comentario: String) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Mensaje de Contacto</h1>
        <p style="margin-bottom: 10px;">¡Hola!</p>
        <p>Se ha recibido un nuevo mensaje con la siguiente información:</p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Nombre:</strong> ${NombreInstitucion}</li>
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

  registerInstitucion(nombre_usuario: any, email_usuario: any, fono_usuario: any, cel_usuario: any) {

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

  correoConPedidos(pedidos: PedidoUsuario[], idPedido: string) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Pedido de Libros</h1>
        <p style="margin-bottom: 10px;">¡Hola!</p>
        <p>Se ha recibido un nuevo pedido de libros con la siguiente información:</p>
        <ul>
            <li><strong>Correo:</strong> ${pedidos[0].correo}</li>
            <li><strong>ID Pedido:</strong> ${idPedido}</li>
            <li><strong>Fecha del Pedido:</strong> ${pedidos[0].fecha}</li>
        </ul>
        <p>Detalles de los libros solicitados:</p>
        <ul style="list-style-type: none; padding-left: 0;">
        ${pedidos.map(pedido => `
            <li style="margin-bottom: 10px;">
                <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
                    <p><strong>Libro:</strong> ${pedido.nombre_libro}</p>
                    <p><strong>Autor:</strong> ${pedido.autor}</p>
                    <p><strong>Editorial:</strong> ${pedido.editorial}</p>
                    <p><strong>Edición:</strong> ${pedido.edicion}</p>
                    <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
                </div>
            </li>
        `).join('')}
        </ul>
        <p>Por favor, revisa el pedido y toma las acciones necesarias.</p>
        <p>¡Gracias!</p>
    </div>
    `;

    console.log('Correo con pedidos:', pedidos);
    const to = "elokolector@gmail.com";
    const subject = 'Nuevo Pedido de Libros';
    const text = 'Se ha recibido un nuevo pedido de libros. Por favor, revisa tu correo electrónico para más detalles.';
    const body = {
      to: to,
      subject: subject,
      text: text,
      html: html
    };

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

}
