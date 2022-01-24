import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateStatusComponent } from './update-status.component';
import { MatButtonModule } from '@angular/material/button';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    UpdateStatusComponent,
    StatusDialogComponent
  ],
  imports: [
    CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatButtonToggleModule
  ],
  exports: [
    UpdateStatusComponent
  ]
})
export class UpdateStatusModule { }
