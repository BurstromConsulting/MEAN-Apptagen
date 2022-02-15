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
  { path: '',children: [
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
    { path: 'user', loadChildren: () => import('./board-user/board-user.module').then(m => m.BoardUserModule)},
    { path: 'admin', loadChildren: () => import('./board-admin/board-admin.module').then(m => m.BoardAdminModule), canActivate: [AdminGuard]}

  ], canActivate: [AuthGuard]},
  //{ path: 'mod', component: BoardModeratorComponent },
  // { path: '', redirectTo: 'kiosk', pathMatch:'full'},
  { path: 'person/:id', loadChildren: () => import('./person/person.module').then(m => m.PersonModule)},
  { path: 'kiosk', loadChildren: () => import('./kiosk/kiosk.module').then(m => m.KioskModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
