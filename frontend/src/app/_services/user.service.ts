import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'user/all', { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'board/user', { responseType: 'json' });
  }
  
  getUserById(id: string): Observable<any> {
    return this.http.get(API_URL + 'user/'+id, { responseType: 'json' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'board/mod', { responseType: 'json' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'board/admin', { responseType: 'json' });
  }
  getAvailabilities(): Observable<any> {
    return this.http.get(API_URL + 'status/all', { responseType: 'json' });
  }

  updatePersonStatus(userId: string, availabilityId: string, message: string): Observable<any> {
    return this.http.put(API_URL + 'user/'+userId+'/status', {availability: availabilityId, message: message}, { responseType: 'json'});
  }
}