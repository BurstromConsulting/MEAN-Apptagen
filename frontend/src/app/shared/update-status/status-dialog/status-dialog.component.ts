import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Availability, Person, Status } from 'src/app/person';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {
  availabilities?: Availability[];
  currentUser: Person;
  status: Status;
  // This component creates the Pop-up window where we then ask the user to adjust their availability and add a status message before we update them.
  constructor(public dialogRef: MatDialogRef<StatusDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService){
    this.status = data.status;
    this.currentUser = data.user;
  }
  
// This onInit gets all available types of styles that a user can select between and presents them as a row of options on the frontend
  ngOnInit(): void {
    this.userService.getAvailabilities().pipe(take(1)).subscribe((data: Availability[]) => {
      this.availabilities = data;
      this.status.availability = data.filter((a) => {
        return a._id === this.status.availability._id;
      })[0];
    })
  }
  //this closes the dialogRef and returns the user to the previous component and sending the status to whatever component called it.

  close() : void{
    this.dialogRef.close(this.status);
  }

}

