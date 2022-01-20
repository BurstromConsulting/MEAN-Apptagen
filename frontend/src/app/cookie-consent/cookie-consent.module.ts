import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieConsentComponent } from './cookie-consent.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CookieConsentComponent],
  imports: [
    CommonModule, HttpClientModule, MatDialogModule, MatButtonModule
  ]
})
export class CookieConsentModule { }
