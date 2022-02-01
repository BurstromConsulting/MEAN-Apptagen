import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Status } from '../person';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private URL = "localhost:8080/";
  private socket!: Socket;
  private _statusUpdate: Subject<any> = new Subject();
  private _configUpdate: Subject<any> = new Subject();


  constructor(private localStorageService: StorageService) { }

  public get statusUpdate(){
    return this._statusUpdate;
  }
  public get configUpdate(){
    return this._configUpdate;
  }

  connect(): void {
    this.socket = io(this.URL);
    this.socket.on("connect", () => {
      //console.log("Client Connected");
      this.socket.on("status/broadcast", (data) => {
        //console.log(data)
        this.statusUpdate.next(data);
      })
      this.socket.on("config/update", (data) => {
        console.log(data);
        this.configUpdate.next(data);
      })
    })
    
  }
  sendStatusUpdate(status: Status, personId: string): void{
    this.socket.emit("status/update",{status: status, personId: personId});
  }
  registerUuid(uuid : string){
    this.socket.emit("register", uuid);
  }
  sendConfigUpdate(config: any, uuid: string): void{
    this.socket.emit("config/update", {config: config, uuid: uuid});
  }
  changeConfigRoom(newConfigId: any, uuid: any, oldConfigId?: any): void{
    this.socket.emit("rooms/change/config", {newId: newConfigId, oldId: oldConfigId, uuid: uuid});
  }


}
