import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceViewComponent } from './device-view.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const route = [
  {
    path: '', component: DeviceViewComponent
  }
]

@NgModule({
  declarations: [
    DeviceViewComponent
  ],
  imports: [
    CommonModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule,
    MatIconModule, FormsModule, MatInputModule, RouterModule.forChild(route),
     MatListModule, MatButtonModule, MatSelectModule
  ]
})
export class DeviceViewModule { }
