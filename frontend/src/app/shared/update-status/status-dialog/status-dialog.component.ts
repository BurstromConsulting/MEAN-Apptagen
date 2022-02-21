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
  constructor(public dialogRef: MatDialogRef<StatusDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService){
    this.status = data.status;
    this.currentUser = data.user;
  }
  

  ngOnInit(): void {
    this.userService.getAvailabilities().pipe(take(1)).subscribe((data: Availability[]) => {
      this.availabilities = data;
      this.status.availability = data.filter((a) => {
        return a._id === this.status.availability._id;
      })[0];
    })
  }
  close() : void{
    this.dialogRef.close(this.status);
  }

}

