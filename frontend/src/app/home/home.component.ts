import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Person, Status } from '../person';
import { SocketService } from '../_services/socket.service';
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
  userdata: Person[] = [];


  
  constructor(private userService: UserService, private route:ActivatedRoute, private router:Router,
    tokenService: TokenStorageService, private socket: SocketService) { 
    if (!!tokenService.getToken()){
      this.loggedInUser = tokenService.getUser();
      console.log(tokenService.getUser());
    }
    socket.connect();
    console.log(tokenService.getToken());
  }

  navigateTo(id: any) { 
    console.log(id)
    this.router.navigate(['person', id])
    
  }

  updatePersonStatus(status: Status): void{
    if(!!this.loggedInUser){
      const userId = this.loggedInUser.id;
      this.userService.updatePersonStatus(userId, status.availability._id, status.message).pipe(take(1)).subscribe(() => {
        console.log("Person Updated");
        this.socket.sendStatusUpdate(status, userId);
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
    this.socket.statusUpdate.subscribe((data) => {
      this.userdata.filter((u) => u._id === data.personId)[0].status = data.status;
    })
  }
}