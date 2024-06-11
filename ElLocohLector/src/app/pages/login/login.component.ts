import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConnectService } from '../../modules/lobby/services/connect.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




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

  constructor(private connectService: ConnectService, private router:Router) { }

  onSubmit() {
    this.connectService.login(this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Usuario iniciado:', response);
          this.router.navigate(['/lobby']);
        },
        (error) => {
          console.error('Error al iniciar usuario:', error);
        }
      );
  }

}
