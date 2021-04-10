import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {  JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { ChangePassword } from '../models/changePassword';
import { ResponseModel } from '../models/response-model';
import { SingleResponseModel } from '../models/single-response-model';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost:58739/api/"
  jwtHelper: JwtHelperService =new JwtHelperService();
  constructor(private localStorageService:LocalStorageService, private httpClient:HttpClient) { }

  getUserName(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()!)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
  getUserId(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()!)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
  changePassword(changePassword:ChangePassword){
    return this.httpClient.post<ResponseModel>(this.baseUrl+"Users/changepassword",changePassword)
  }
  getUserById(userId:number){
    return this.httpClient.get<SingleResponseModel<User>>(this.baseUrl+"Users/id?id="+userId)
  }
  changeUserInformation(userModel:User){
return this.httpClient.post<ResponseModel>(this.baseUrl+"Users/userInformation",userModel)
  }
}
