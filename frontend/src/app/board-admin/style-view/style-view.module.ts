import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleViewComponent } from './style-view.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const route = [
  {
    path: '', component: StyleViewComponent
  }
]

@NgModule({
  declarations: [
    StyleViewComponent
  ],
  imports: [
    CommonModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule,
    MatIconModule, FormsModule, MatInputModule, RouterModule.forChild(route),
     MatListModule, MatButtonModule, MatSelectModule
  ]
})
export class StyleViewModule { }
