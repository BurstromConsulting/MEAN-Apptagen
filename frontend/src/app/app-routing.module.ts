import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AdminGuard } from './_services/admin-guard.service';
import { AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',children: [ //Children value means that it will only load this content if its requested on the Users end. which is then using the loadChildren functionality on request for that component only.
    // this is to prevent unnecessary data being sent to the user and to reduce bandwidth load
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
    { path: 'user', loadChildren: () => import('./board-user/board-user.module').then(m => m.BoardUserModule)},
     // CanActivate[AdminGuard] is also calling on Admin Guard to ensure that you're both authorized and an adnmin to access admin board.
    { path: 'admin', loadChildren: () => import('./board-admin/board-admin.module').then(m => m.BoardAdminModule), canActivate: [AdminGuard]}

    // CanActivate[AuthGuard] confirms that a user has the proper permissions before recieving the content above.
  ], canActivate: [AuthGuard]},
  { path: 'person/:id', loadChildren: () => import('./person/person.module').then(m => m.PersonModule)},
  { path: 'kiosk', loadChildren: () => import('./kiosk/kiosk.module').then(m => m.KioskModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
