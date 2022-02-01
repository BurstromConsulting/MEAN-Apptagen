import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskComponent } from './kiosk.component';
import { PersonCardModule } from '../shared/person-card/person-card.module';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', component: KioskComponent
  }
]

@NgModule({
  declarations: [
    KioskComponent
  ],
  imports: [
    CommonModule, PersonCardModule, RouterModule.forChild(route)
  ]
})
export class KioskModule { }
