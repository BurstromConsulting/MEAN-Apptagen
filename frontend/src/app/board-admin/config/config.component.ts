import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, take, interval, merge, forkJoin  } from 'rxjs';
import { Person } from 'src/app/person';
import { UserService } from 'src/app/_services/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { ConfigService } from 'src/app/_services/config.service';
import { MatSelectionListChange } from '@angular/material/list';
import { DeviceService } from 'src/app/_services/device.service';
import { MatSelectChange, MatSelectTrigger } from '@angular/material/select';
import { removeElement } from 'src/app/app.constants';

// import {COMMA, ENTER} from '@angular/cdk/keycodes';
// import {Component, ElementRef, ViewChild} from '@angular/core';
// import {FormControl} from '@angular/forms';
// import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
// import {MatChipInputEvent} from '@angular/material/chips';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  availablePersons: Person[] = [];
  configCtrl = new FormControl();
  availableConfigs: any = [];
  filteredPersons: Observable<Person[]>;
  selectedConfig: any;
  allDevices: any = [];
  selectedDevice: any;
  
  @ViewChild('personInput') personInput!: ElementRef<HTMLInputElement>;
  constructor(private userService: UserService, public configService: ConfigService, public deviceService: DeviceService) {

    this.filteredPersons = this.configCtrl.valueChanges.pipe(
      startWith(null),
      map((input: any | null) => ((!!input && !input.name ) ? this._filter(input) : this.availablePersons.slice())),
    );
  }

  ngOnInit(): void {
    forkJoin([
      this.userService.getPublicContent(),
      this.configService.getAllConfigs(),
      this.deviceService.getAllDevices()
    ]).pipe(take(1)).subscribe(([users,configs, devices]) => {
      this.availablePersons = users;
      this.allDevices = devices;
      console.log(users, configs);
      this.availableConfigs = configs;
      this.selectedConfig = this.availableConfigs[0];
      this.selectedDevice = this.allDevices[0];
    })
  }

  sendConfig(): void {
    this.configService.updateConfig(this.selectedConfig).pipe(take(1)).subscribe( () =>{
      console.log("Config updated");
    });
  }
  // updateDevice(): void {
  //   this.deviceService.updateDeviceConfig(this.selectedDevice, this.selectedConfig).pipe(take(1)).subscribe( () =>{
  //     console.log("Device updated");
  //   });
  // }
  // deleteDevice(): void {
  //   this.deviceService.removeDevice(this.selectedDevice.uuid).pipe(take(1)).subscribe( () =>{
  //     console.log("Device Deleted");
  //     removeElement(this.allDevices, this.selectedDevice);
  //   });
  // }

  onConfigChange(e: MatSelectionListChange){
    // console.log(e.options[0].value);
    this.selectedConfig = e.options[0].value;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedConfig.users.push(event.option.value);
    this.personInput.nativeElement.value = '';
    this.configCtrl.setValue(null);
  }
  // currentDevice(event: MatSelectionListChange): void{
  //   console.log(event.options[0].value);
  //   this.selectedDevice = event.options[0].value;
  // }

  remove(person: Person): void {
      removeElement(this.selectedConfig.users, person);
  }

  private _filter(personName: string): Person[] {
    return this.availablePersons.filter(person => person.name.toLowerCase().includes(personName.toLowerCase()));
  }
}