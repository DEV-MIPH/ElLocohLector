import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from '../../components/body/body.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConnectService } from './services/connect.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  providers: [ConnectService],
  exports: [BodyComponent, HeaderComponent, FooterComponent ]
})
export class LobbyModule { }
