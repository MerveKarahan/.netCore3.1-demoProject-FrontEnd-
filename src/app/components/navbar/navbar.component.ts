import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {  JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  jwtHelper: JwtHelperService =new JwtHelperService();
  decodedToken: any;

  constructor(private localStorageService: LocalStorageService, private userService:UserService) { }

  ngOnInit(): void {
    
  }

  logOut() {
    this.localStorageService.deleteToken()
  }

  loggedIn() {
    return this.localStorageService.getToken() != null ? true : false
  }

  getUserName(){
    return this.userService.getUserName()
  }



}
