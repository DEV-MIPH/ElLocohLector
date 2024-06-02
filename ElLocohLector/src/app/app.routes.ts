import { Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ContrasennaComponent } from './pages/contrasenna/contrasenna.component';

export const routes: Routes = [ 
    /*cuando alguien entra a lobby estará cargado lobby component */
    {path: 'lobby', component: LobbyComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'contrasenna', component: ContrasennaComponent},
    /*path vacio manda a home (lobby) */
    { path: '', redirectTo: '/lobby', pathMatch: 'full' }, 
    /*path ** envés de mandar page 404 envía a lobby */
    { path: '**', redirectTo: '/lobby' }
];
