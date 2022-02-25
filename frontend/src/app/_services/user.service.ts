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

  getUserCard(filename: string): Observable<any> {
    
    return this.post(`board/${PATH_URL}card`, filename);
  }
  
  getUserById(id: string): Observable<any> {
    
    return this.get(`${PATH_URL}${id}`);
  }
  
  getUserByIdArray(id: string[]): Observable<any> {
    console.log("GetUsers: ",id);
    const body = {
      idList: id
    }
    return this.post(`${PATH_URL}list`, body);
  }

  updateStyle(styleId: string, userId: string): Observable<any> {
    const body = {
      styleId: styleId
    }
    return this.put(`${PATH_URL}${userId}/style`, body);
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
  verifyToken(): Observable<any> {
    return this.get('token');
  }

  updateImage(body: any, userId: string): Observable<any> {
    return this.post(`${PATH_URL}${userId}/profile`, body, {contentType: "multipart/form-data"});
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