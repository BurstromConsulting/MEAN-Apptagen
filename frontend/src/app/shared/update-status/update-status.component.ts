import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Status } from 'src/app/person';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  
  @Input() status: Status = {
    message: "",
    availability: {
      _id: "",
      status: "",
      color: "black"
    }
  };
  @Output() updatedStatus: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const statusOptions = this.dialog.open(StatusDialogComponent, {restoreFocus: false, data: this.status});

    statusOptions.afterClosed().pipe(take(1)).subscribe((data: Status) => {
      if(!!data){
        this.onUpdatedStatus(data);
      }
    });
    }

  onUpdatedStatus(status: Status): void{
    this.status = status;
    this.updatedStatus.emit(this.status);
  }
}

