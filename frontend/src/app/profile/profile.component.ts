import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  profileCard: any;
  background: any;
  constructor(private token: TokenStorageService, public userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getUserById(this.currentUser.id).pipe(take(1)).subscribe((data: any) => {
      this.profileCard = data;
    })
    this.background = 'url("http://localhost:8080/images/card-background/background1.jpg")';
    // this.userService.getUserCard("background1.jpg").pipe(take(1)).subscribe((data:any) => {
    //   this.background = data;
    // })
  }
}