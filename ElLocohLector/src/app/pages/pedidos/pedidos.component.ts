import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-pedidos',
    standalone: true,
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.css',
    imports: [HeaderComponent, FooterComponent]
})
export class PedidosComponent {

}
