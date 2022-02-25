import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {
  // Default Status Icon for a user if their image fails to load. This is just a simple SVG that gets tied to Status.availability.color, defaults to red.
  @Input() color: string = "red";
  @Input() size: number = 20;
  strokeWidth = 1;


  constructor() { }

  ngOnInit(): void {
  }

}
