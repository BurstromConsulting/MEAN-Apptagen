import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PersonComponent } from './person.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';

const route = [
  {path: '', component: PersonComponent
  }
]
@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule, MatCardModule, RouterModule.forChild(route), MatListModule
  ],

  exports: [
    PersonComponent
  ]
})
export class PersonModule { }
