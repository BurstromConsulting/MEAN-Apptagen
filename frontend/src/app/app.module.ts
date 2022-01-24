import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
//import { PersonModule } from './person/person.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Auth Guide Imports below
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { SocketService } from './_services/socket.service';
import { MatDialogModule } from '@angular/material/dialog';
import { StorageService } from './_services/storage.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardModeratorComponent,
    BoardUserComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [UserService, AuthService, SocketService, authInterceptorProviders, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
