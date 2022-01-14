import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  @Input() person?: any;
  @Input() detailed: boolean = false;
  @Input() editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log('Person',this.person);
  }

}
