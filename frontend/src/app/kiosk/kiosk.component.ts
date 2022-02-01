import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Person } from '../person';
import { ConfigService } from '../_services/config.service';
import { SocketService } from '../_services/socket.service';
import { UserService } from '../_services/user.service';
import * as uuid from 'uuid';
import { StorageService } from '../_services/storage.service';
import { DeviceService } from '../_services/device.service';

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
  uuid: string;

  constructor(private userService: UserService, private socket: SocketService, private localStorageService: StorageService, public configService: ConfigService, public deviceService: DeviceService) {
    socket.connect();
    this.uuid = this.localStorageService.getUuid();
  }
  ngOnInit(): void {
    if(this.localStorageService.hasUuid()){
      //console.log(this.uuid);
      this.uuid = this.localStorageService.getUuid();
      // this.deviceService.getDeviceById(this.uuid).pipe(take(1)).subscribe({
      //   next: (res) => {
      //   //console.log("uuid test",res);
      // }
      // });
        this.deviceService.getDeviceById(this.uuid).pipe(take(1)).subscribe({
        next: (deviceData: any) => {
          //console.log(!deviceData);
          if(!deviceData){

            this.localStorageService.removeUuid();
            this.uuid = uuid.v4();
            this.deviceService.addNewDevice(this.uuid).pipe(take(1)).subscribe(() => {
              this.localStorageService.setUuid(this.uuid);
            });

          }else {

            if(!deviceData.config){
              return;
            }
            
            this.configService.findConfigById(deviceData.config._id).pipe(take(1)).subscribe({
              next: (configData: any) =>{
                //console.log("This is Config Data", configData);
                this.config = configData;
                this.socket.changeConfigRoom(this.config._id.valueOf(), this.uuid);
                this.userService.getUserByIdArray(this.config.users.map((u: any) => u._id)).pipe(take(1)).subscribe({
                  next: (personData:Person[]) => {
                    //console.log("This is userdata", personData);
                    this.userdata = personData;
                    //console.log(this.userdata);
                  },
                  error: err => {
                    //console.log(err);
                  }
            
                });
              },
              error: err => {
                //console.log(err);
              }
            });
          }
          this.socket.registerUuid(this.uuid);
          
        },
        error: err => {
          //console.log(err);
        }
      });
    }
    else {
      this.uuid = uuid.v4();
      this.deviceService.addNewDevice(this.uuid).pipe(take(1)).subscribe(() => {
        this.localStorageService.setUuid(this.uuid);
        this.socket.registerUuid(this.uuid);
      });
    }
    this.socket.configUpdate.subscribe((data) => {
      if(!data){
        this.config = null;
        return ;
      }
      //console.log("Hello, this is data", data);
      this.userService.getUserByIdArray(data.users).pipe(take(1)).subscribe((users) => {
        this.socket.changeConfigRoom(data._id.valueOf(), this.uuid, this.config?._id);
        this.config = data;
        this.userdata = users;
      });
      // this.userdata = data;
    })
    this.socket.statusUpdate.subscribe((data) => {
      this.userdata.filter((u) => u._id === data.personId)[0].status = data.status;
    })
  }

}
