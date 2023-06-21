import { Component, OnInit } from '@angular/core';
import {Location} from "../models/location";
import {LocationHours} from "../models/location_time";
import {LocationZones} from "../models/locaton_zones";
import {Specialist} from "../models/specialist";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../service/token-storage.service";
import {LocationService} from "../service/location.service";
import {DomSanitizer} from "@angular/platform-browser";
import {SpecialistService} from "../service/specialist.service";
import {UserService} from "../service/user.service";
import {Service_specialist} from "../models/service_specialist";
import {CartService} from "../service/cart.service";

// @ts-ignore
@Component({
  selector: 'app-specialist-more-detailed',
  templateUrl: './specialist-more-detailed.component.html',
  styleUrls: ['./specialist-more-detailed.component.css']
})
export class SpecialistMoreDetailedComponent implements OnInit {
  specialistId!: string;
  specialization:any;
  specialization_id: any;
  isLoggedIn = false;
  specialist!: Specialist;
  service_spec!: Service_specialist[];
  isSpecialist=false;

  constructor(private cartService: CartService, private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private userService: UserService, private specialistService:SpecialistService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isSpecialist = this.tokenStorageService.isSpecialist();
    const specId = this.route.snapshot.paramMap.get('id');
    if (specId !== null) {
      this.specialistId = specId.toString();
    }
    this.getSpecialist();
    this.getServiceSpecialist( this.specialistId );
  }

  getSpecialist(){
    return this.specialistService.getSpecialistById(this.specialistId).subscribe((specialist) => {
      console.log(specialist);
      this.specialist = specialist;
      this.specialization_id = this.specialist.id_specialization;
      this.getSpecialization(this.specialization_id);
    });
  }

  getServiceSpecialist(id:any ){
    return this.specialistService.getServiceSpecialistId(id).subscribe((specialist_services) => {
      console.log(specialist_services);
      this.service_spec = specialist_services;
    });
  }

  private getSpecialization(id: any) {
    this.userService.getSpecialization(id).subscribe(
      data => {
        this.specialization = data.name;
        console.log(this.specialization)
      },
      error => {
        console.log(error);
      }
    );
  }

  addToCart(service: any) {
    this.cartService.addToCart(service);
    alert('service add to cart');
  }


}
