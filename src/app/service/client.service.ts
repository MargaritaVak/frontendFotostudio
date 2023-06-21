import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import {LocationZones} from "../models/locaton_zones";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


// @ts-ignore
@Injectable({
  providedIn: 'root',
})

export class ClientService {
  private clientsUrl = 'http://localhost:3000/client-calendar'; // URL to web api

  constructor(private http: HttpClient) {}

  getCalendarClient(id: any):Observable<any[]>{
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<any[]>(url);
  }


}
