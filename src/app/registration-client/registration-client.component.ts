import { Component, OnInit } from '@angular/core';
import { RegisterClientService } from '../service/register-client.service';

// @ts-ignore
@Component({
  selector: 'app-registration-client',
  templateUrl: './registration-client.component.html',
  styleUrls: ['./registration-client.component.css'],
})
export class RegistrationClientComponent implements OnInit {
  form: any = {
    full_name: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private resisterClientService: RegisterClientService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { full_name, email, password } = this.form;

    this.resisterClientService.registerСlient(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
