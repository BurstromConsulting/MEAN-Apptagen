import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardUserComponent } from './board-user.component';
import { UpdateStatusModule } from '../shared/update-status/update-status.module';
import { PersonCardModule } from '../shared/person-card/person-card.module';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', children: [
    {path: '', component: BoardUserComponent},
  ]}
]

@NgModule({
  declarations: [
    BoardUserComponent
  ],
  imports: [
    CommonModule, UpdateStatusModule, PersonCardModule, RouterModule.forChild(route)
  ]
})
export class BoardUserModule { }
