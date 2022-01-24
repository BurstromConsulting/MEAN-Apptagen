import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardAdminComponent } from './board-admin.component';
import { RouterModule } from '@angular/router';

const route = [
  {path: '', component: BoardAdminComponent},
  {path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)}
]

@NgModule({
  declarations: [
    BoardAdminComponent,],
  imports: [
    CommonModule, RouterModule.forChild(route)
  ]
})
export class BoardAdminModule { }
