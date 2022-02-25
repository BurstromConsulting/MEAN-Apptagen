import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Person } from '../person';
import { ConfigService } from '../_services/config.service';
import { SocketService } from '../_services/socket.service';
import { UserService } from '../_services/user.service';
import * as uuid from 'uuid';
import { StorageService } from '../_services/storage.service';
import { DeviceService } from '../_services/device.service';
import { PersonCardComponent } from 'src/app/shared/person-card/person-card.component';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit {
  _appCard!: PersonCardComponent;
  @ViewChild("appCard") set appCard(elem: any) {
    this._appCard = elem;
  };

  refreshTimer?: number;
  content?: string;
  loggedInUser: Person | null = null;
  userdata: Person[] = [];
  config: any;
  uuid: string;

  constructor(private userService: UserService, private socket: SocketService, private localStorageService: StorageService, public configService: ConfigService, public deviceService: DeviceService, public cdr: ChangeDetectorRef) {
    // Connects to the Backends sockets and listens to emits
    socket.connect();
    // Sets UUID definitely in the constructor for the angular OnInit.
    this.uuid = this.localStorageService.getUuid();
  }
  ngOnInit(): void {
    // Confirms that this device has a UUID
    if (this.localStorageService.hasUuid()) {
      this.uuid = this.localStorageService.getUuid();
      // Gets Device relevant information based off of UUID
      this.deviceService.getDeviceById(this.uuid).pipe(take(1)).subscribe({
        next: (deviceData: any) => {
          if (!deviceData) {
            // If theres no device data, removes UUID, generates a new one and adds this device as a new device to the database.
            this.localStorageService.removeUuid();
            this.uuid = uuid.v4();
            this.deviceService.addNewDevice(this.uuid).pipe(take(1)).subscribe(() => {
              this.localStorageService.setUuid(this.uuid);
            });
          } else {
            // If device has no config, ends the OnInit here.
            if (!deviceData.config) {
              return;
            }
            // if Device has a config, then retrieves all Config related information for the Device.
            this.configService.findConfigById(deviceData.config._id).pipe(take(1)).subscribe({
              next: (configData: any) => {
                this.config = configData;
                // Connects to the Socket Room to listen for any updates to this config.
                this.socket.changeConfigRoom(this.config._id.valueOf(), this.uuid);
                // Gets all users for this Config and maps their Id to the array needed for the backend call.
                this.userService.getUserByIdArray(this.config.users.map((u: any) => u._id)).pipe(take(1)).subscribe({
                  next: (personData: Person[]) => {
                    this.userdata = personData;
                  },
                  error: err => {
                    console.log(err);
                  }
                });
              },
              error: err => {
                console.log(err);
              }
            });
          }
          //Registers this UUID to the Socket functionality, to make it possible to list what devices are listening to what Config Room, among other functions.
          this.socket.registerUuid(this.uuid);
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else {
      // If device has no UUID, generate and create UUID and add this to our Database then begin listening for a device updte from our sockets.
      this.uuid = uuid.v4();
      this.deviceService.addNewDevice(this.uuid).pipe(take(1)).subscribe(() => {
        this.localStorageService.setUuid(this.uuid);
        this.socket.registerUuid(this.uuid);
      });
    }
    // Starts to continously listen to config updates being called by our Socket.Io functionality.
    this.socket.configUpdate.subscribe((data) => {
      if (!data) {
        this.config = null;
        return;
      }
      // Catches When Config Changes what Users is on it.
      let tempList: string[] = data.users;
      // Cleans data from the Socket to ensure that the backend calls are recieved in the String Array Formatting it needs
      if (data?.users.length > 0 && !!data.users[0]['_id']) {
        tempList = []
        tempList = data.users.map((u: any) => u._id);
      }
      this.userService.getUserByIdArray(tempList).pipe(take(1)).subscribe({
        next: (personData: Person[]) => {
          this.socket.changeConfigRoom(data._id.valueOf(), this.uuid, this.config?._id);
          this.userdata =  [];
          this.userdata = personData;
          this.cdr.detectChanges();
          this.config = data;
        },
        error: err => {
          console.log(err);
      
        }
      });
    })
    // Listens to Socket updates for a Users Status on the Device
    this.socket.statusUpdate.subscribe((data) => {
      this.userdata.filter((u) => u._id === data.personId)[0].status = data.status;
    })
  }
  getAutoRotate(): number{
    return this.userdata.length>1 ? 3000 : 0;
  }
  canRotate(): boolean{
    if(this.userdata.length>1){
      return true;
    }else {
      return false;
    }
  }
}
