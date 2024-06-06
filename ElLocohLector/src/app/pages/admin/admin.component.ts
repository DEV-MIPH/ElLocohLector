import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdmComponentComponent } from '../../components/adm-component/adm-component.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,AdmComponentComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
