import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConnectService } from '../../modules/lobby/services/connect.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  email: string = '';
  password: string = '';

  constructor(private connectService: ConnectService, private router:Router, private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response) {
          console.log('Usuario iniciado:', response);
          this.router.navigate(['/lobby']);
        } else {
          console.error('Credenciales inválidas');
        }
      },
      (error) => {
        console.error('Error al iniciar usuario:', error);
      }
    );
  }

}
