import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-adm-component',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatToolbarModule,MatMenuModule,MatTooltipModule ],
  templateUrl: './adm-component.component.html',
  styleUrl: './adm-component.component.css'
})
export class AdmComponentComponent {

} 
