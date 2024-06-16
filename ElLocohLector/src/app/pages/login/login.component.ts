import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  

  constructor(private router:Router, private authService: AuthService,private snackBar: MatSnackBar) { }

  async onSubmit() {
    try {
      const login = await this.authService.login(this.email, this.password);
      console.log(login);
      if(login) {
        this.router.navigate(['/lobby']);
      }
      else{
        this.snackBar.open('Error al autenticar. Inténtelo nuevamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  }

}
