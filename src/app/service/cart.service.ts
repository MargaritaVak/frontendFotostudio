import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LocationHours} from "../models/location_time";
import {BookingZone} from "../models/booking_zone";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private bookingByIdUrl = 'http://localhost:3000/booking';


  constructor(private http: HttpClient) {
    // При инициализации сервиса, проверяем наличие сохраненных элементов в localStorage
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.saveCartItems();
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      if (this.isLocationBooking(item)) {
        // Если это бронирование локации
        const bookingId = item.id_local;
        console.log(bookingId)
        this.deleteBookingFromDatabase(bookingId);
      }
      this.saveCartItems();
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  clearCart() {
    localStorage.removeItem('cartItems');
  }


  private isLocationBooking(item: any): boolean {
    return item.hasOwnProperty('id_local');
  }

  private deleteBookingFromDatabase(id: any) {
    const url = `${this.bookingByIdUrl}/${id}`;
    console.log(url)
    return this.http.delete(url,httpOptions );
  }

}
