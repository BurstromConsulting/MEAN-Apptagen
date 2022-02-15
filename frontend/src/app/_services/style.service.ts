import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

const PATH_URL = 'style/';

@Injectable({
  providedIn: 'root'
})
export class StyleService extends DataService{

  constructor(http: HttpClient) {
    super(http)
   }

  getAllStyles(): Observable<any> {
    return this.get(`${PATH_URL}all`);
  }

  getStyleById(id: string): Observable<any> {
    
    return this.get(`${PATH_URL}${id}`);
  }
  
  createStyle(body: any): Observable<any> {
    
    return this.post(`${PATH_URL}create`, body);
  }
  
  updateStyle(id: string, body: any): Observable<any> {
    
    return this.put(`${PATH_URL}${id}/update`, body);
  }
};