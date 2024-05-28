import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BodyComponent } from '../../components/body/body.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BodyComponent, HttpClientModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

}
