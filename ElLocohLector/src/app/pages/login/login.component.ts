import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgetPasswordComponent } from '../../components/forget-password/forget-password.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,ForgetPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  

  constructor(private router:Router, private authService: AuthService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

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
  openDialog(): void {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal ha sido cerrado');
    });
  }

  

}
