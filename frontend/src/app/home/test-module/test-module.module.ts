import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModuleComponent } from './test-module.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', component: TestModuleComponent
  }
]

@NgModule({
  declarations: [
    TestModuleComponent
  ],
  imports: [
    CommonModule, HttpClientModule, MatDialogModule, MatButtonModule, RouterModule.forChild(route)
  ]
})
export class TestModuleModule { }
