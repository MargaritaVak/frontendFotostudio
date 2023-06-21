import {Component, NgModule, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';

// @ts-ignore
@Component({
  selector: 'app-client-personal-account',
  templateUrl: './client-personal-account.component.html',
  styleUrls: ['./client-personal-account.component.css'],
})
export class ClientPersonalAccountComponent implements OnInit {
  user: any;
  isClient!: boolean;
  constructor(
    private tokenService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.isClient = this.tokenService.isClient();
  }

}
