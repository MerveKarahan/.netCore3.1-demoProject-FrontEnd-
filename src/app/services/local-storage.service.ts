import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
tokenKey:string="Token"
  constructor() { }

  setToken(token:string){
    localStorage.setItem(this.tokenKey,token)
  }
  getToken(){
    return localStorage.getItem(this.tokenKey)
  }
   
  deleteToken(){
    localStorage.removeItem(this.tokenKey)
  }
  
}
