import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import {LocationHours} from "../models/location_time";
import {LocationZones} from "../models/locaton_zones";
import {BookingZone} from "../models/booking_zone";
import {LocationById} from "../models/locationById";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationUrl = 'http://localhost:3000/location'; // URL to web api
  private locationTimeByIdUrl = 'http://localhost:3000/location-time';
  private locationWorkTimeUrl ='http://localhost:3000/location/work-time';
  private locationZonesUrl ='http://localhost:3000/location/zones'
  private locationBookingUrl='http://localhost:3000/location/new-booking';
  private getLocationBookingUrl='http://localhost:3000/location-booking';
  private getLocationZonesUrl='http://localhost:3000/location/zone';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl);
  }

  getLocationTimeById(id: string): Observable<any[]>{
    const url = `${this.locationTimeByIdUrl}/${id}`;
    return this.http.get<any[]>(url);
  }

  getLocation(id: string): Observable<LocationById> {
    const url = `${this.locationUrl}/${id}`;
    return this.http.get<LocationById>(url);
  }

  getWorkTime(id: string): Observable<LocationHours[]>{
    const url = `${this.locationWorkTimeUrl}/${id}`;
    return this.http.get<LocationHours[]>(url);
  }

  getLocationZones(id: string):Observable<LocationZones[]>{
    const url = `${this.locationZonesUrl}/${id}`;
    return this.http.get<LocationZones[]>(url);
  }

  newBooking(body: BookingZone): Observable<BookingZone>{
    return this.http.post<BookingZone>(`${this.locationBookingUrl}`, body, httpOptions);
  }

  getLocationBooking(id: any): Observable<BookingZone>{
    const url = `${this.getLocationBookingUrl}/${id}`;
    return this.http.get<BookingZone>(url);
  }

  getLocationZoneById(id:any):Observable<LocationZones>{
    const url = `${this.getLocationZonesUrl}/${id}`;
    return this.http.get<LocationZones>(url);
  }

}
