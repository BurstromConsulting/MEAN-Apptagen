import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { PersonCardModule } from '../shared/person-card/person-card.module';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', children: [
    {path: '', component: ProfileComponent},
  ]}
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule, PersonCardModule, RouterModule.forChild(route)
  ]
})
export class ProfileModule { }
