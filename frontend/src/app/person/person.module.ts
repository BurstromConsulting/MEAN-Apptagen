import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { RouterModule } from '@angular/router';
import { PersonCardModule } from '../shared/person-card/person-card.module';

const route = [
  {path: '', component: PersonComponent
  }
]
@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule, RouterModule.forChild(route), PersonCardModule,
  ],

  exports: [
    PersonComponent
  ]
})
export class PersonModule { }
