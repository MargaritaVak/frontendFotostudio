import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../service/token-storage.service";

// @ts-ignore
@Component({
  selector: 'app-main-page-body',
  templateUrl: './main-page-body.component.html',
  styleUrls: ['./main-page-body.component.css'],
})
export class MainPageBodyComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
  }
}
