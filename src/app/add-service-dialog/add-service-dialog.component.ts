import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Service_specialist} from "../models/service_specialist";
import {SpecialistService} from "../service/specialist.service";
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import {TokenStorageService} from "../service/token-storage.service";
import {UserService} from "../service/user.service";
import {ServiceService} from "../service/service.service";
import {Service} from "../models/service";

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.css']
})
export class AddServiceDialogComponent{
  user:any;
  specialistId!: string;
  serviceId!: string;
  timeServices!: number;
  costServices!: string;
  moreInfo!: string;
  selectedFiles!: File[];
  services!: Service[];
  selectedService!: string;
  customService!: string;

  constructor(private serviceSpecialistService: SpecialistService,
              private router: Router,
              private location: Location, private tokenService: TokenStorageService, private serviceService: ServiceService, private userService: UserService) {}

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  addService() {
    if (this.selectedService && this.selectedService !== 'custom') {
      this.serviceId = this.selectedService;
    } else if (this.customService) {
      // Если выбрана опция "Custom Service", создаем новую услугу и получаем ее идентификатор
      console.log(this.customService)
      this.serviceService.addService(this.customService).subscribe(
        result => {
          this.serviceId = result;
          console.log(this.serviceId)
          this.addServiceSpecialist();
        },
        error => {
          console.error('Error adding custom service', error);
        }
      );
      return; // Прекращаем выполнение функции, чтобы избежать добавления услуги до получения идентификатора
    }
    this.addServiceSpecialist();

  }

  addServiceSpecialist() {
    const userId = this.tokenService.getUserId();
    this.userService.getSpecialist(userId).subscribe(
      data => {
        this.user = data;
        console.log(this.user.id);
        this.serviceSpecialistService
          .addServiceSpecialist(
            this.specialistId = this.user.id,
            this.serviceId,
            this.timeServices,
            this.costServices,
            this.moreInfo,
            this.selectedFiles
          )
          .subscribe(
            response => {
              console.log('Service added successfully', response);
            },
            error => {
              console.error('Error adding service', error);
            }
          );
        alert('Service added successfully')
        location.reload()
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
    this.serviceService.getService().subscribe(
      services => {
        this.services = services;
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }



  onCancel(): void {
    this.location.back();
  }



}
