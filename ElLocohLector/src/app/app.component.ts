import { HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LobbyModule } from './modules/lobby/lobby.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule,LobbyModule, HeaderComponent, FooterComponent, BodyComponent]

})
export class AppComponent {
  title = 'ElLocohLector';
}


