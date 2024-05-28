import { Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'lobby', component: LobbyComponent },
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/lobby', pathMatch: 'full' },
    { path: '**', redirectTo: '/lobby' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

