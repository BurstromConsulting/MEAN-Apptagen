import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardAdminComponent } from './board-admin.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const route = [
  {path: '', children: [
    {path: '', component: BoardAdminComponent},
    {path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule), pathMatch: "full"},
    {path: 'device', loadChildren: () => import('./device-view/device-view.module').then(m => m.DeviceViewModule), pathMatch: "full"},
    {path: 'style', loadChildren: () => import('./style-view/style-view.module').then(m => m.StyleViewModule), pathMatch: "full"}
  ]}
]

@NgModule({
  declarations: [
    BoardAdminComponent,],
  imports: [
    CommonModule, RouterModule.forChild(route), MatButtonModule, MatIconModule
  ]
})
export class BoardAdminModule { }
