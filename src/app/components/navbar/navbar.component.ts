import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {  JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  jwtHelper: JwtHelperService =new JwtHelperService();
  decodedToken: any;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.decodeToken()
  }

  logOut() {
    this.localStorageService.deleteToken()
  }

  loggedIn() {
    return this.localStorageService.getToken() != null ? true : false
  }

  decodeToken(){
    this.decodedToken = this.jwtHelper.decodeToken(this.localStorageService.getToken()!);
    console.log(this.decodedToken)
  }
  getUserName(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()!)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
  getUserId(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()!)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }



}
