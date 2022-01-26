import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  constructor(private userService: UserService, public configService: ConfigService, public deviceService: DeviceService) { }

  ngOnInit(): void {
    this.configControl.setValue(this.nullConfig);
    forkJoin([
      this.configService.getAllConfigs(),
      this.deviceService.getAllDevices()
    ]).pipe(take(1)).subscribe(([configs, devices]) => {
      console.log(devices, configs);
      this.allDevices = devices;
      this.availableConfigs = configs;
      this.availableConfigs.push(this.nullConfig);
      this.selectedDevice = this.allDevices[0];
      this.selectedConfig = this.selectedDevice.config;
      console.log("this selected",this.selectedDevice.config);
      if(!!this.selectedDevice.config){
        this.configControl.patchValue(this.availableConfigs.filter((config: any) => config._id === this.selectedDevice.config._id)[0]);
      }
      this.allDevices.forEach((element: any) => {
        console.log(element);
        if(this.deviceLocations.includes(element.location)){
        }
        else {
        this.deviceLocations.push(element.location);
        }
      });
      console.log("Device Locations", this.deviceLocations);
    })
  }

  currentDevice(event: MatSelectionListChange): void{
    console.log(event.options[0].value);
    this.selectedDevice = event.options[0].value;
    if(!!this.selectedDevice.config){
      this.configControl.patchValue(this.availableConfigs.filter((config: any) => config._id === this.selectedDevice.config._id)[0]);
    }else {
      this.configControl.patchValue(this.nullConfig);
    }
  }

  updateDevice(): void {
    
    let configSettings = null;
    if(this.configControl.value !== this.nullConfig){
      configSettings = this.configControl.value;
    }
    this.deviceService.updateDeviceConfig(this.selectedDevice, configSettings).pipe(take(1)).subscribe( () =>{
      console.log("Device updated");
    });
  }
  deleteDevice(): void {
    this.deviceService.removeDevice(this.selectedDevice.uuid).pipe(take(1)).subscribe( () =>{
      console.log("Device Deleted");
      removeElement(this.allDevices, this.selectedDevice);
    });
  }
  selected(event: MatSelectChange): void {
    // console.log(event);
    this.selectedDevice.config = event.value;
  }
}
