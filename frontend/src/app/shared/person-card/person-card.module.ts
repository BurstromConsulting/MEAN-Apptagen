import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from './person-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { StatusIconModule } from '../status-icon/status-icon.module';
import { UpdateStatusModule } from '../update-status/update-status.module';



@NgModule({
  declarations: [
    PersonCardComponent
  ],
  imports: [
    CommonModule, MatCardModule, MatListModule, StatusIconModule, UpdateStatusModule
  ],
  
  exports: [
    PersonCardComponent
  ]
})
export class PersonCardModule { }