import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ConfigService } from '../_services/config.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  showAdminBoard = true;
  showModeratorBoard = true;
  isLoggedIn = false;
  username = '';


  constructor(private router:Router, private userService: UserService, public configService: ConfigService) { }

  logout(): void{}

  ngOnInit(): void {
  }

  remove(configId: string): void {
    this.configService.deleteConfig(configId);
  }
  navigateTo(path: string) { 
    this.router.navigate(['admin', path])
    //console.log(path);
    
  }
}