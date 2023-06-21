import { Component, OnInit } from '@angular/core';
import { RegisterClientService } from '../service/register-client.service';
import { first } from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
  }
}
