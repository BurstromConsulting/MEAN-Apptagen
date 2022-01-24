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
  selectedPersons: Person[] = [];
  configCtrl = new FormControl();
  availableConfigs: any = [];
  filteredPersons: Observable<Person[]>;
  selectedConfig: any;
  
  @ViewChild('personInput') personInput!: ElementRef<HTMLInputElement>;
  constructor(private userService: UserService, public configService: ConfigService) {

    this.filteredPersons = this.configCtrl.valueChanges.pipe(
      startWith(null),
      map((person: Person | null) => (person ? this._filter(person) : this.availablePersons.slice())),
    );
  }

  ngOnInit(): void {
    forkJoin([
      this.userService.getPublicContent(),
      this.configService.getAllConfigs()
    ]).pipe(take(1)).subscribe(([users,configs]) => {
      this.availablePersons = users;

      console.log(users, configs);
      this.availableConfigs = configs;
    })
  }

  send(): void {

  }

  onConfigChange(e: MatSelectionListChange){
    // console.log(e.options[0].value);
    this.selectedConfig = e.options[0].value;
    
  }

  add(event: MatChipInputEvent): void {
    const person = (event.value);
    console.log(event);

    // // Add our Person
    // if (person) {
    //   this.selectedPersons.push(person);
    // }

    // Clear the input value
    event.chipInput!.clear();

    this.configCtrl.setValue(null);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedPersons.push(event.option.value);
    // this.personInput.nativeElement.value = '';
    this.configCtrl.setValue(null);
  }

  remove(person: Person): void {
    const index = this.selectedPersons.indexOf(person);

    if (index >= 0) {
      this.selectedPersons.splice(index, 1);
    }
  }

  private _filter(person: Person): Person[] {

    return this.availablePersons.filter(person => person._id.includes(person._id));
  }
}