import {Component, Inject, OnInit} from '@angular/core';
import {LocationService} from "../service/location.service";
import {LocationHours} from "../models/location_time";
import {Specialist} from "../models/specialist";
import {BookingZone} from "../models/booking_zone";
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../service/cart.service";

// @ts-ignore
@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit{
  locationId!: any;
  isLoggedIn = false;
  booking_zone: BookingZone = new BookingZone();
  nameZone!:any;

  constructor(
    private snackBar: MatSnackBar, private location: Location, private router: Router,private route: ActivatedRoute, private tokenStorageService: TokenStorageService,  private locationService: LocationService, private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.submitBooking();

  }

  // @ts-ignore
  submitBooking(): void {
    this.locationService.getLocationZoneById(this.locationId).subscribe((result)=>{
      console.log(result);
      this.nameZone = result.name;
    });
    this.booking_zone.location_zone_id = this.locationId;
    this.locationService.newBooking(this.booking_zone).subscribe( (result) => {
      console.log('Booking created:', result);
      this.router.navigate(['../']); // Переход на предыдущую страницу
      this.showSuccessNotification(); // Отображение уведомления об успешном бронировании
      const locationZoneId = result.id;
      this.locationService.getLocationBooking(locationZoneId).subscribe((locationZone) => {
        const id = locationZone.id
        const startTime = locationZone.start_time;
        const endTime = locationZone.end_time;
        const bookingDate = locationZone.booking_date;
        const costEnd = locationZone.cost_end;

        const newCartItem = {
          id_local: id,
          name: this.nameZone,
          startTime: startTime,
          endTime: endTime,
          bookingDate: bookingDate,
          totalCost: costEnd
        };
        this.cartService.addToCart(newCartItem);
      });
    });
  }

  showSuccessNotification(): void {
    this.snackBar.open('Booking created successfully', 'Close', {
      duration: 3000,
    });
  }

  goBack(): void {
    this.location.back();
  }
}

