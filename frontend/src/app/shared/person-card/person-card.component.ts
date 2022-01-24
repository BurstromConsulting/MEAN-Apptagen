import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/person';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit{

  @Input() person?: any;
  @Input() detailed: boolean = false;
  @Input() editMode: boolean = false;
  @Output() titleClick: EventEmitter<string> = new EventEmitter();

  constructor() { 

  }

  ngOnInit(): void {
    console.log('Person',this.person);
  }
  onTitleClick(): void {
    this.titleClick.emit(this.person._id);
  }
  close(): void {

  }
}
