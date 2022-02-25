import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { forkJoin, take } from 'rxjs';
import { removeElement } from 'src/app/app.constants';
import { ConfigService } from 'src/app/_services/config.service';
import { DeviceService } from 'src/app/_services/device.service';
import { UserService } from 'src/app/_services/user.service';
import { MatSelectChange, MatSelectTrigger } from '@angular/material/select';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { SocketService } from 'src/app/_services/socket.service';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.css']
})
export class DeviceViewComponent implements OnInit {

  nullConfig = {
    name: "none",
    _id: null
  };
  configControl = new FormControl();
  availableConfigs: any = [];
  selectedConfig: any;
  allDevices: any = [];
  selectedDevice: any = null;
  deviceLocations: any = [];

  constructor(private userService: UserService, public configService: ConfigService, private socket: SocketService, public deviceService: DeviceService) { }

  ngOnInit(): void {
    this.configControl.setValue(this.nullConfig);
    // Fork Join ensures that both of these calls are done before we call any functions on them.
    forkJoin([
      this.configService.getAllConfigs(),
      this.deviceService.getAllDevices()
    ]).pipe(take(1)).subscribe(([configs, devices]) => {
      //Alphabetical sorting of them, then we assign them to various local values.
      devices.sort((a: any,b: any) => a.name.localeCompare(b.name));
      configs.sort((a: any,b: any) => a.name.localeCompare(b.name));
      this.allDevices = devices;
      this.availableConfigs = configs;
      this.availableConfigs.push(this.nullConfig);
      this.selectedDevice = this.allDevices[0];
      this.selectedConfig = this.selectedDevice.config;
      if(!!this.selectedDevice.config){
        this.configControl.patchValue(this.availableConfigs.filter((config: any) => config._id === this.selectedDevice.config._id)[0]);
      }
      //Gets the location from each Device, currently not used.
      //To-do: Add filtering and sorting based off of device Location
      this.allDevices.forEach((element: any) => {
        if(this.deviceLocations.includes(element.location)){
        }
        else {
        this.deviceLocations.push(element.location);
        }
      });
    })
  }

  currentDevice(device: any): void{
    this.selectedDevice = device;
    if(!!this.selectedDevice.config){
      this.configControl.patchValue(this.availableConfigs.filter((config: any) => config._id === this.selectedDevice.config._id)[0]);
    }else {
      this.configControl.patchValue(this.nullConfig);
    }
  }

  updateDevice(): void {
    
    let configSettings: null = null;
    // Checks if the selected config settings matches our null config. So that we dont send bad data to the backend.
    if(this.configControl.value !== this.nullConfig){
      configSettings = this.configControl.value;
    }
    this.deviceService.updateDeviceConfig(this.selectedDevice, configSettings).pipe(take(1)).subscribe( () =>{  
      // Backend handles all of the actions for when the Device's config is updated
    });
  }
  // Deletes device from backend and from Device list
  deleteDevice(): void {
    this.deviceService.removeDevice(this.selectedDevice).pipe(take(1)).subscribe( () =>{
      removeElement(this.allDevices, this.selectedDevice);
    });
  }
  selected(event: MatSelectChange): void {
    this.selectedDevice.config = event.value;
  }
}
