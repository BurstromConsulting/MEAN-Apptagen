
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { StyleService } from '../_services/style.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
//Profile page for the currently logged in user, their Access token, Their Roles/Permissions and a preview of their Person Card.
// No edits can be done to their Status or Card from this page
// To-do: Merge Userboard with Profile Component. Putting both User functionalities in the same place.
export class ProfileComponent implements OnInit {
  currentUser: any;
  profileCard: any;
  background: any;
  constructor(private token: TokenStorageService, public userService: UserService, public styleService: StyleService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getUserById(this.currentUser.id).pipe(take(1)).subscribe((data: any) => {
      this.profileCard = data;
      let tempStyle = data.style._id
      this.styleService.getStyleById(tempStyle).pipe(take(1)).subscribe((style: any) => {
        this.background = `url("http://localhost:8080/images/background/${style.filename}")`;
      })
    })
  }
}