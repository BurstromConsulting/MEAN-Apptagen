import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

const AUTH_URL = 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService{
  constructor(http: HttpClient) {
    super(http)
   }

  login(username: string, password: string): Observable<any> {
    return this.post(`${AUTH_URL}signin`, {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, name: string, password: string): Observable<any> {
    return this.post(`${AUTH_URL}signup`, {
      username,
      email,
      name,
      password
    }, httpOptions);
  }
}