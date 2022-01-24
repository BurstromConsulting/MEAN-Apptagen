import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ConfigComponent } from './config.component';
import {MatList, MatListModule} from '@angular/material/list';

const route = [
  {path: '', component: ConfigComponent
  }
]

@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, MatIconModule, FormsModule, MatInputModule, RouterModule.forChild(route), MatListModule
  ]
})
export class ConfigModule { }
