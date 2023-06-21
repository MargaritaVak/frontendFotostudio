import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// @ts-ignore
@Injectable({
  "providedIn": 'root',
})
export class ServiceService {
  private serviceUrl = 'http://localhost:3000/service';
  private servicePostUrl = 'http://localhost:3000/add-service';


  constructor(private http: HttpClient) {}

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(this.serviceUrl);
  }

  addService(name: string):Observable<any> {
    return this.http.post<any>(this.servicePostUrl,  { name },httpOptions);
  }
}
