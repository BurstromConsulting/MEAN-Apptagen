import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = `http://${environment.serverUrl}:${environment.port}/api/`;

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
