import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Person } from '../person';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  user!: Person;
  tokenData: any;
  image: any;

  // Gets the individual user data for their user page, to allow for users to log their own statuses when they're logged into the website.
  constructor(public userService: UserService, public tokenService: TokenStorageService) { 
    // User token is active for 24 hours before its timed out and will be needed to be refreshed
    this.tokenData = tokenService.getUser();
  }

  ngOnInit(): void {
      // If token doesnt have an ID, then there's no user to be shown on the user content.
    if(!!this.tokenData.id){
      // Retrieves all user related data, to be presented for the User.
      this.userService.getUserById(this.tokenData.id).pipe(take(1)).subscribe((data: any) => {
        this.user = data;
      })
    }
  }

  // Update functionality has been moved to User's Person-card.
  // Update remains here as a stub for any future expansion of the User-board.
  update(status: any): void {
  }

}
