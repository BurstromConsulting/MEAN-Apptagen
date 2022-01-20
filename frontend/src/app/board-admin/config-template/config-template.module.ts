import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigTemplateComponent } from './config-template.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', component: ConfigTemplateComponent
  }
]

@NgModule({
  declarations: [
    ConfigTemplateComponent
  ],
  imports: [
    CommonModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, MatIconModule, FormsModule, MatInputModule, RouterModule.forChild(route)
  ]
})
export class ConfigTemplateModule { }
