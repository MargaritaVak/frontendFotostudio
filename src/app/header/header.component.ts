import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';

// @ts-ignore
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  search: String = '';
  isLoggedIn = false;
  firstname?: string;
  user:any;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.firstname = this.user.firstname;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
  }
}
