import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Person } from './person';
import { StorageService } from './_services/storage.service';
import { TokenStorageService } from './_services/token-storage.service';
import { ConfigService } from './_services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private roles: string[] = [];
  private configList: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  kioskView = false;
  username?: string;
  title = 'MEAN-Apptagen';
  id!: number;
  person!:Person;
  config!: any;


  
  constructor(private router:Router, private tokenStorageService: TokenStorageService, private localStorageService: StorageService, private configService: ConfigService){

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

        this.username = user.username;
      }
    //console.log("Here");
  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
  navigateTo(id: number) { 
    this.router.navigate(['person', id])
    
  }

}
