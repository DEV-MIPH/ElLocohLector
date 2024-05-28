import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BodyComponent } from '../../components/body/body.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BodyComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

}
