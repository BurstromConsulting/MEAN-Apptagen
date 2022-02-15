import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { forkJoin, take } from 'rxjs';
import { StyleService } from 'src/app/_services/style.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-style-view',
  templateUrl: './style-view.component.html',
  styleUrls: ['./style-view.component.css']
})
export class StyleViewComponent implements OnInit {

  nullStyle = {
    name: "none",
    _id: null
  };

  styleControl = new FormControl();
  allUsers: any = [];
  selectedUser: any = null;
  selectedStyle: any;
  availableStyles: any = [];
  UserCompany: any = [];
  constructor(private userService: UserService, public styleService: StyleService) { }

  ngOnInit(): void {
    forkJoin([
      this.styleService.getAllStyles(),
      this.userService.getPublicContent()
    ]).pipe(take(1)).subscribe(([styles, users]) => {
      //console.log(devices, configs);
      this.allUsers = users;
      this.availableStyles = styles;
      this.selectedUser = this.allUsers[0];
      this.selectedStyle = this.selectedUser.style;
      if(!!this.selectedUser.style){
        this.styleControl.patchValue(this.availableStyles.filter((style: any) => style._id === this.selectedUser.style._id)[0]);
      }
      this.allUsers.forEach((element: any) => {

        //console.log(element);
        if(this.UserCompany.includes(element.company)){
        }
        else {
        this.UserCompany.push(element.company);
        }
      });
      //console.log("Device companys", this.devicecompanys);
    })
  }

  currentUser(user: any): void{
    //console.log("Device: ",device);
    this.selectedUser = user;
    if(!!this.selectedUser.style){
      this.styleControl.patchValue(this.availableStyles.filter((style: any) => style._id === this.selectedUser.style._id)[0]);
    }else {
      this.styleControl.patchValue(this.nullStyle);
    }
  }
  updateUser(): void {
    
    let styleSettings: null = null;
    if(this.styleControl.value !== this.nullStyle){
      styleSettings = this.styleControl.value;
    }
    this.userService.updateStyle(this.nullStyle._id, this.selectedUser).pipe(take(1)).subscribe( () =>{
      //console.log("Device updated");
      // this.socket.sendConfigUpdate(configSettings, this.selectedDevice.uuid);
    });
  }
  selected(event: MatSelectChange): void {
    // //console.log(event);
    this.selectedUser.style = event.value;
  }
}
