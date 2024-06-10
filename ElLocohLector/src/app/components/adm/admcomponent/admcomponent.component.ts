import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdmbooksComponent } from '../admbooks/admbooks.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddbookmodalComponent } from '../addbookmodal/addbookmodal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admcomponent',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatToolbarModule,MatMenuModule,MatTooltipModule,AdmbooksComponent,
    MatFormFieldModule,MatInputModule,FormsModule,MatDialogModule,AddbookmodalComponent],
  templateUrl: './admcomponent.component.html',
  styleUrl: './admcomponent.component.css'
})
export class AdmcomponentComponent {

  constructor(public dialog: MatDialog, private router: Router) {}

  /*Agregar libro*/
  openDialog(): void {
    const dialogRef = this.dialog.open(AddbookmodalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //Para navegar a page Perfil al apretar el button de Perfil
  navegarPerfil() {
    console.log('llegue aqui')
    this.router.navigate(['/perfil']);
}

  
}
