import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Person, Status } from 'src/app/person';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { take } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  // Default testing inputs for the Update Status component.
  @Input() status: Status = {
    message: "",
    availability: {
      _id: "",
      status: "",
      color: "black"
    }
  };
  
  // Default testing inputs for the Update Status component.
  @Input() user: Person = {
    _id: "",
    id: "",
    name: "",
    title: "",
    status: {
      message: "",
      availability: {
        _id: "",
        status: "",
        color: "black"
      }},
    roles: []
  };
  @Output() updatedStatus: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog, private userService: UserService, private tokenService: TokenStorageService){ }

  ngOnInit(): void {
  }
  //Calls the StatusDialog components, makes it pop-up and then calls updatePersonStatus based off of the return value it gets on its "afterClosed" which is called when "Closed()" sends a return value.
  openDialog(): void {
    const statusOptions = this.dialog.open(StatusDialogComponent, {restoreFocus: false, data: {status: this.status, user: this.user}, width: '50%', height: '40%'});

    statusOptions.afterClosed().pipe(take(1)).subscribe((data: Status) => {
      if(!!data){
        
        this.userService.updatePersonStatus(this.user._id, data.availability._id, data.message ).pipe(take(1)).subscribe(() => {
          this.onUpdatedStatus(data);
        })
        
      }
    });
    }
    // This sets the status to whats being assigned to it, then it emits that its status has been changed to any socket that is listening.
    // This request is also done in the backend and is only here for redundancy when a user changes its Status.
    // As the User-boad isnt actively listening to the Backend for the users current status.
  onUpdatedStatus(status: Status): void{
    this.status = status;
    this.updatedStatus.emit(this.status);
  }
}

