import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  get(path:string): Observable<any>{
    return this.http.get(this.API_URL + path, { responseType: 'json' });
  }
  put(path: string, body:any): Observable<any>{
    return this.http.put(this.API_URL + path, body, { responseType: 'json' });
  }
  post(path: string, body: any, options={}): Observable<any>{
    return this.http.post(this.API_URL + path, body, options);
  }
  delete(path:string): Observable<any>{
    return this.http.delete(this.API_URL + path);
  }
}
