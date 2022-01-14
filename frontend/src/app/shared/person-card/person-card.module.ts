import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from './person-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { StatusIconModule } from '../status-icon/status-icon.module';



@NgModule({
  declarations: [
    PersonCardComponent
  ],
  imports: [
    CommonModule, MatCardModule, MatListModule, StatusIconModule
  ],
  
  exports: [
    PersonCardComponent
  ]
})
export class PersonCardModule { }