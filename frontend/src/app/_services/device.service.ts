import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { StorageService } from './storage.service';

const PATH_URL = 'device/';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends DataService{

  constructor(private storageService: StorageService, http: HttpClient) {
    super(http);
   }

   getAllDevices(): Observable<any> {
    return this.get(`${PATH_URL}all`);
  }
  addNewDevice(deviceId: string): Observable<any> {
    return this.post(`${PATH_URL}all`, deviceId);
  }

  getDeviceById(deviceId: any): Observable<any> {
    return this.get(`${PATH_URL}${deviceId}`);
  }
  removeDevice(deviceId: any): Observable<any> {
    return this.delete(`${PATH_URL}${deviceId}`);
  }

  updateDeviceConfig(device: any, config: any): Observable<any> {
    const body = {
      device:device,
      config: config
    }
    return this.put(`${PATH_URL}${device.uuid}`, body);;
  }
}
