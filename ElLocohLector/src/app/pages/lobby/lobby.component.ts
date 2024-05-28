import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BodyComponent } from '../../components/body/body.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [HeaderComponent,BodyComponent,FooterComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

}
