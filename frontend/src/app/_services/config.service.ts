import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../person';
import { DataService } from './data.service';
import { StorageService } from './storage.service';

const PATH_URL = 'config/';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends DataService{

  constructor(private storageService: StorageService, http: HttpClient) {
    super(http);
   }

  public deleteConfig(config: string): Observable<any>{
    return this.delete(`${PATH_URL}${config}`);
  }

  public getAllConfigs(): Observable<any>{
    return this.get(`${PATH_URL}all`);
  }

  public updateConfig(config: any): Observable<any>{
    console.log(config);
    return this.put(`${PATH_URL}${config._id}`, config);
  }

  public findConfig(configId: string): Observable<any> {
      return this.get(`${PATH_URL}${configId}`);
  }

  public findConfigById(configId: string): Observable<any> {
    return this.get(`${PATH_URL}${configId}`);
  }
  public createConfig(configId: string): Observable<any> {
    return this.post(`${PATH_URL}`, {});
  }
}