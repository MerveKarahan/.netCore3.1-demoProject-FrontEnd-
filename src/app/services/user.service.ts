import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {  JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtHelper: JwtHelperService =new JwtHelperService();
  constructor(private localStorageService:LocalStorageService) { }

  getUserName(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()!)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
  getUserId(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()!)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
}
