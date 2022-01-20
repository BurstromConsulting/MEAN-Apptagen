import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieConfig } from "./cookieConfig";
import { UserService } from "../_services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { take } from "rxjs";

@Component({
  selector: 'cookie-consent',
  template: './cookie-consent.component.html',
  styles: ['./cookie-consent.component.css']
})

export class CookieConsentComponent implements OnInit{
  private isConsented: boolean = false;
  COOKIE_CONSENT_EXPIRE_DAYS = 7;
  ipAddress = '';
  cookie: CookieConfig;


  constructor(private http:HttpClient, public dialogRef: MatDialogRef<CookieConsentComponent>,@Inject(MAT_DIALOG_DATA) public data: CookieConfig, private userService: UserService) {
      this.isConsented = this.getCookie(this.ipAddress) === '1';
      this.cookie = data;
    
  }

  ngOnInit() {
    this.getIPAddress();
  }

  getIPAddress(): void{
    this.http.get("http://api.ipify.org/?format=json").pipe(take(1)).subscribe((res:any) => {
        this.ipAddress = res.ip;
    });
  }

  private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
              return c.substring(cookieName.length, c.length);
          }
      }
      return '';
  }

  private deleteCookie(name: string) {
      this.setCookie(name, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      let cpath:string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  private consent(isConsent: boolean, e: any) {
      if (isConsent) {
          this.setCookie(this.ipAddress, '1', this.COOKIE_CONSENT_EXPIRE_DAYS);
          this.isConsented = true;
          e.preventDefault();
      }
      
      return this.isConsented;
  }

  close() : void{
    this.dialogRef.close(this.cookie);
  }
}