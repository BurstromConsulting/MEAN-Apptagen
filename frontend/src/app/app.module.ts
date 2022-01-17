import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
import { PersonModule } from './person/person.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Auth Guide Imports below
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { PersonCardComponent } from './shared/person-card/person-card.component';
import { PersonCardModule } from './shared/person-card/person-card.module';
import { UpdateStatusModule } from './shared/update-status/update-status.module';


const route = [
  {path: 'person/:id', loadChildren: () => import('./person/person.module').then(m => m.PersonModule)
  }, {path: 'person', loadChildren: () => import('./person/person.module').then(m => m.PersonModule)
}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
  ],
  imports: [
    BrowserModule,
    PersonModule,
    RouterModule.forRoot(route),
    MatListModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PersonCardModule,
    UpdateStatusModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
