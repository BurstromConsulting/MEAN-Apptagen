import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  private setData(key:string, data: any){  
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
      localStorage.setItem(key, jsonData);
  }
  private getData(key: string): any{
    return localStorage.getItem(key);
  }
  // getPeople(){
  //   this.getData('person');
  // }
  getUuid(){
    return this.getData('uuid');
  }
  // setPeople(){
  //   this.getData('person');
  // }
  
  setUuid(uuid: string){
    this.setData('uuid', uuid);
  }
}
