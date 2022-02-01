import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

const PATH_URL = 'user/';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService{

  constructor(http: HttpClient) {
    super(http)
   }

  getPublicContent(): Observable<any> {
    return this.get(`${PATH_URL}all`);
  }

  getUserBoard(): Observable<any> {
    
    return this.get('board/user');
  }
  
  getUserById(id: string): Observable<any> {
    
    return this.get(`${PATH_URL}${id}`);
  }
  
  getUserByIdArray(id: string[]): Observable<any> {
    const body = {
      idList: id
    }
    return this.post(`${PATH_URL}list`, body);
  }

  getModeratorBoard(): Observable<any> {
    
    return this.get('board/mod');
  }

  getAdminBoard(): Observable<any> {
    
    return this.get('board/admin');
  }
  getAvailabilities(): Observable<any> {
    return this.get('status/all');
  }

  updatePersonStatus(userId: string, availabilityId: string, message: string): Observable<any> {
    const body = {
      userId: userId,
      availabilityId: availabilityId,
      message: message
    };
    return this.put(`${PATH_URL}${body.userId}/status`, body);
  }
}