import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
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
  showToolbar = true;

  
  constructor(public router:Router, private tokenStorageService: TokenStorageService, private localStorageService: StorageService, private configService: ConfigService){

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
      //Checks if user is logged in and then gets their roles and Username for the general app overview.
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

        this.username = user.username;
      }
      // This prevents the navigational bar from being shown in the eventuality that the user has navigated to 'Kiosk' which is a view thats supposed to be for non-interactable displays,
      // or atleast displays that shouldnt be able to navigate away from their website.
      this.router.events.subscribe((event)=>{
        if(event instanceof NavigationEnd){
          this.showToolbar = !(event.urlAfterRedirects === '/kiosk');
        }
      })
  }

// Reloads the window once you've clicked the Log Out and removes your token.
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  // NavigateTo Function was used to assign each App-person-card its own sub-webpage,
  // In current implementation, users dont have a any other view to show other than their App-person-card
  // Its not currently in use.
  navigateTo(id: number) { 
    this.router.navigate(['person', id])
    
  }

}
