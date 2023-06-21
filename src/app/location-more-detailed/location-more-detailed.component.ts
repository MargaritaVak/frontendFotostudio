import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { LocationService } from '../service/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../models/location';
import { LocationHours } from '../models/location_time';
import { LocationZones } from '../models/locaton_zones';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { LocationById } from '../models/locationById';

@Component({
  selector: 'app-location-more-detailed',
  templateUrl: './location-more-detailed.component.html',
  styleUrls: ['./location-more-detailed.component.css'],
})
export class LocationMoreDetailedComponent implements OnInit {
  locationId!: any;
  isLoggedIn = false;
  location!: LocationById;
  location_time: LocationHours[] = [];
  zones: LocationZones[] = [];
  photoArray: string[] = [];
  photoArrayZone: string[] = [];
  isSpecialist = false;

  constructor(
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private locationService: LocationService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isSpecialist = this.tokenStorageService.isSpecialist();
    this.isSpecialist = this.tokenStorageService.isSpecialist();
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.getLocation();
    this.getWorkTime();
    this.getZones();
  }

  getLocation() {
    return this.locationService.getLocation(this.locationId).subscribe(
      (location) => {
        console.log(location);
        this.location = location;
        this.photoArray = location.photo;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getWorkTime() {
    return this.locationService
      .getWorkTime(this.locationId)
      .subscribe((work_time) => {
        console.log(work_time);
        this.location_time = work_time;
      });
  }
  getZones() {
    this.locationService
      .getLocationZones(this.locationId)
      .subscribe((zones) => {
        this.zones = zones;
        console.log(this.zones);
      });
  }
}
