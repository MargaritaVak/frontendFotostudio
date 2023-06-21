import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from "../models/order";
import {Service_specialist} from "../models/service_specialist";
import {newOrder} from "../models/new_order";
import {LocationZones} from "../models/locaton_zones";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// @ts-ignore
@Injectable({
  "providedIn": 'root',
})
export class OrderService {
  private newOrderUrl = 'http://localhost:3000/new-order';
  private getOrderClient ='http://localhost:3000/order-client'
  private getOrderSpecialist='http://localhost:3000/order-specialist'

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    const url = `${this.newOrderUrl}`;
    console.log(orderData)// Замените на конечную точку создания заказа на вашем сервере
    return this.http.post(url, orderData);
  }

  getOrdersClient(id_client: any):Observable<any[]>{
    const url = `${this.getOrderClient}/${id_client}`;
    return this.http.get<any[]>(url);
  }

  getOrdersSpecialist(id: any):Observable<any[]>{
    const url = `${this.getOrderSpecialist}/${id}`;
    return this.http.get<any[]>(url);
  }



}

