import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Status } from '../person';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private URL = "localhost:8080/";
  private socket!: Socket;
  private _statusUpdate: Subject<any> = new Subject();


  constructor() { }

  public get statusUpdate(){
    return this._statusUpdate;
  }

  connect(): void {
    this.socket = io(this.URL);
    this.socket.on("connect", () => {
      console.log("Client Connected");
    })
    this.socket.on("status/broadcast", (data) => {
      console.log(data)
      this.statusUpdate.next(data);
    })
  }
  sendStatusUpdate(status: Status, personId: string): void{
    this.socket.emit("status/update",{status: status, personId: personId});
  }
}
