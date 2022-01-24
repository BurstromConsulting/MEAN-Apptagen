import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UpdateStatusModule } from '../shared/update-status/update-status.module';
import { PersonCardModule } from '../shared/person-card/person-card.module';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent],
  imports: [
    CommonModule, PersonCardModule, UpdateStatusModule, RouterModule.forChild(route)
  ]
})
export class HomeModule { }
