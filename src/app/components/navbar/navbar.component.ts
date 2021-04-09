import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.localStorageService.deleteToken()
  }

  loggedIn() {
    return this.localStorageService.getToken() != null ? true : false
  }

  




}
