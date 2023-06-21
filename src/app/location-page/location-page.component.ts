import { Component, OnInit } from '@angular/core';
import { LocationService } from '../service/location.service';
import { Location } from '../models/location';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

// @ts-ignore
@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css'],
})
export class LocationPageComponent implements OnInit {
  locations: Location[] = [];

  constructor(
    private locationService: LocationService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    return this.locationService.getLocations().subscribe((locations) => {
      console.log(locations);
      this.locations = locations;
    });
  }

}
