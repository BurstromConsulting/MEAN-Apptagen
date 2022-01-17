import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Person, Status } from '../person';
import { TokenStorageService } from '../_services/token-storage.service.spec';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  loggedInUser: Person | null = null;
  userdata?: Person[];


  
  constructor(private userService: UserService, private route:ActivatedRoute, private router:Router, tokenService: TokenStorageService) { 
    if (!!tokenService.getToken()){
      this.loggedInUser = tokenService.getUser();
      console.log(tokenService.getUser());
    }
    
    console.log(tokenService.getToken());
  }

  navigateTo(id: any) { 
    console.log(id)
    this.router.navigate(['person', id])
    
  }

  updatePersonStatus(status: Status): void{
    if(!!this.loggedInUser){
      console.log(status);
      const userId = this.loggedInUser.id;
      this.userService.updatePersonStatus(userId, status.availability._id, status.message).pipe(take(1)).subscribe(() => {
        console.log("Person Updated");
        if(!!this.userdata){
        this.userdata.filter((u) => u._id === userId)[0].status = status;
        }
      });

    }
  }

  ngOnInit(): void {
    this.userService.getPublicContent().pipe(take(1)).subscribe({
      next: (data:Person[]) => {
        this.userdata = data;
        console.log(this.loggedInUser, this.userdata);
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}