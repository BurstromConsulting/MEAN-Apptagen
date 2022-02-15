import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() {
  }

  private setData(key:string, data: any){  
    const jsonData = JSON.stringify(data);
    //console.log(jsonData);
      localStorage.setItem(key, jsonData);
  }
  private getData(key: string): any{
    const item = localStorage.getItem(key);
    return !!item ? JSON.parse(item) : null;
  }
  private setValue(key:string, value: any){
      localStorage.setItem(key, value);
  }
  private getValue(key: string): any{
    return localStorage.getItem(key);
  }
  private hasKey(key: string): boolean{ 
    return !!this.getValue(key);
  }
  hasUuid(){
    return this.hasKey('uuid');
  }
  removeUuid(){
    return localStorage.removeItem('uuid');
  }
  // getPeople(){
  //   this.getData('person');
  // }
  getUuid(){
    return this.getValue('uuid');
  }
  // setPeople(){
  //   this.getData('person');
  // }
  
  setUuid(uuid: string){
    this.setValue('uuid', uuid);
  }
}
