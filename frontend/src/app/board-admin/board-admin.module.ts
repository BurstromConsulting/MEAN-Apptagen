import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardAdminComponent } from './board-admin.component';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', component: BoardAdminComponent}, 
  {path: 'config', loadChildren: () => import('./config-template/config-template.module').then(m => m.ConfigTemplateModule)},
]

@NgModule({
  declarations: [
    BoardAdminComponent,],
  imports: [
    CommonModule, RouterModule.forChild(route)
  ]
})
export class BoardAdminModule { }
