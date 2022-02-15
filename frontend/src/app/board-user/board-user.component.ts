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

  constructor(public userService: UserService, public tokenService: TokenStorageService) { 
    this.tokenData = tokenService.getUser();
  }

  ngOnInit(): void {
    if(!!this.tokenData.id){
      this.userService.getUserById(this.tokenData.id).pipe(take(1)).subscribe((data: any) => {
        this.user = data;
      })
      // this.userService.getUserCard("background1.jpg").pipe(take(1)).subscribe((data:any) => {
      //   this.image = data;
      // })
    }
  }

  update(status: any): void {
  }

}
