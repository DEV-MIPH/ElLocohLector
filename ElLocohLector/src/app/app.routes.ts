import { Routes,RouterModule } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ContrasennaComponent } from './pages/contrasenna/contrasenna.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [ 
    /*cuando alguien entra a lobby estará cargado lobby component (que a su vez carga header, body y footer)*/
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: 'lobby', component: LobbyComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'colaboradores', component: ColaboradoresComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'pedidos', component: PedidosComponent},
    {path: 'contrasenna', component: ContrasennaComponent},
    /*path vacio manda a home (lobby) */
    { path: '', redirectTo: '/lobby', pathMatch: 'full' }, 
    /*path ** envés de mandar page 404 envía a lobby */
    { path: '**', redirectTo: '/lobby' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
