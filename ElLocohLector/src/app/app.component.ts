import { HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LobbyModule } from './modules/lobby/lobby.module';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule,LobbyModule]

})
export class AppComponent {
  title = 'ElLocohLector';
}


