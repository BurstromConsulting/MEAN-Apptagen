import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {

  @Input() color: string = "red";
  @Input() size: number = 20;
  strokeWidth = 1;


  constructor() { }

  ngOnInit(): void {
  }

}
