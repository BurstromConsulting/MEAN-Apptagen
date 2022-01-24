import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Person } from '../person';
import { ConfigService } from '../_services/config.service';
import { SocketService } from '../_services/socket.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit {

  content?: string;
  loggedInUser: Person | null = null;
  userdata: Person[] = [];
  config: any;

  constructor(private userService: UserService, private socket: SocketService, public configService: ConfigService) {
    socket.connect();
  }
  ngOnInit(): void {
    this.config = this.configService.findConfig()
    this.userService.getPublicContent().pipe(take(1)).subscribe({
      next: (data:Person[]) => {
        for (let i in this.config.users){
          data.forEach((p) =>{
            if(p._id === i){
              this.userdata.push(p);
              console.log(p);
            }
          })
        }
        console.log(this.userdata);
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
