import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, take, interval, merge, forkJoin } from 'rxjs';
import { Person } from 'src/app/person';
import { UserService } from 'src/app/_services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
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
  newConfigs: any = [];

  @ViewChild('personInput') personInput!: ElementRef<HTMLInputElement>;
  constructor(private userService: UserService, public configService: ConfigService, public deviceService: DeviceService) {
// on Constructor sets the Config Form Control to the values of the config selected. And removes any additional people.
    this.filteredPersons = this.configCtrl.valueChanges.pipe(
      startWith(null),
      map((input: any | null) => ((!!input && !input.name) ? this._filter(input) : this.availablePersons.slice())),
    );
  }

  ngOnInit(): void {
    forkJoin([
      this.userService.getPublicContent(),
      this.configService.getAllConfigs(),
      this.deviceService.getAllDevices()
    ]).pipe(take(1)).subscribe(([users, configs, devices]) => {
// Sorts devies, users and configs in alphabetical order
      devices.sort((a: any, b: any) => a.name.localeCompare(b.name));
      configs.sort((a: any, b: any) => a.name.localeCompare(b.name));
      users.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.availablePersons = users;
      this.allDevices = devices;
      //console.log(users, configs);
      this.availableConfigs = configs;
      this.selectedConfig = this.availableConfigs[0];
      this.selectedDevice = this.allDevices[0];
    })
  }

  sendConfig(): void {
    //  checks if the selected config we're pushing has the new attribute set or not, meaning we're creating a new config.
    if (!!this.selectedConfig.new) {
      this.selectedConfig.new = false;
      this.configService.createConfig(this.selectedConfig).pipe(take(1)).subscribe((data) => {
        removeElement(this.newConfigs, data);
        this.selectedConfig._id = data._id;
        // We've now created a new config, pushing it to the list of available configs
        this.availableConfigs.push(this.selectedConfig);
      })
    }
    // If it doesnt, we're updating an exsisting config.
    else {
      this.configService.updateConfig(this.selectedConfig).pipe(take(1)).subscribe(() => {
        //console.log("Config updated");

      });
    }
  }

  // Sets the config we've clicked on as our Selected config
  onConfigChange(config: any) {
    this.selectedConfig = config;
  }
  // Called when you click "Add config", and appends it to our config list
  newConfig(): void {
    const newconfig = { _id: this.newConfigs.length, name: `New Config ${this.newConfigs.length}`, users: [], new: true };
    this.newConfigs.push(newconfig);
    this.selectedConfig = newconfig;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedConfig.users.push(event.option.value);
    this.personInput.nativeElement.value = '';
    this.configCtrl.setValue(null);
  }


  remove(person: Person): void {
    // Removes a person from the list of users on a config.
    removeElement(this.selectedConfig.users, person);
  }
  // Deletes config from the datable and the list of available configs
  deleteConfig(): void {
    if (!!this.selectedConfig.new) {
      removeElement(this.availableConfigs, this.selectedConfig);
    } else {
      this.configService.deleteConfig(this.selectedConfig._id).pipe(take(1)).subscribe(() => {
        //console.log("Device Deleted");
        removeElement(this.availableConfigs, this.selectedConfig);
      });
    }
  }
  private _filter(personName: string): Person[] {
    return this.availablePersons.filter(person => person.name.toLowerCase().includes(personName.toLowerCase()));
  }
}