import { Component, OnInit } from '@angular/core';
import { RegisterSpecialistService } from '../service/register-specialist.service';
import { SpecializationsService } from '../service/specializations.service';
import { Specialization } from '../models/specialization';
import { Specialist } from '../models/specialist';

// @ts-ignore
@Component({
  selector: 'app-registration-specialist',
  templateUrl: './registration-specialist.component.html',
  styleUrls: ['./registration-specialist.component.css'],
})
export class RegistrationSpecialistComponent implements OnInit {
  specialist: Specialist = new Specialist();
  specializations: Specialization[] = [];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  customService!: string;

  constructor(
    private registerSpecialistService: RegisterSpecialistService,
    private specializationsService: SpecializationsService
  ) {}

  ngOnInit(): void {
    this.specializationsService
      .getSpecializations()
      .subscribe((specializations) => {
        this.specializations = specializations;
      });
  }

  register(): void {
    if (this.specialist.id_specialization === 'custom') {
      this.specializationsService
        .addSpecialization(this.customService)
        .subscribe({
          next: (data) => {
            this.specialist.id_specialization = data;
            console.log(this.specialist.id_specialization);
            this.registerSpecialist();
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          },
        });
    } else {
      this.registerSpecialist();
    }
  }

  registerSpecialist(): void {
    this.registerSpecialistService
      .registerSpecialist(this.specialist)
      .subscribe({
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
