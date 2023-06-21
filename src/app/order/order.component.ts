import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { TokenStorageService } from '../service/token-storage.service';
import { newOrder } from '../models/new_order';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';

// @ts-ignore
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  cartItems: any[] = [];
  studioBookings: any[] = [];
  specialistServices: any[] = [];
  startTime!: string;
  endTime!: string;
  bookingDate!: string;
  comment!: string;
  number_order: string = '';
  clientId: any;
  isSuccessful = false;
  isBook = false;

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
    this.studioBookings = this.cartItems.filter(
      (item) => item.hasOwnProperty('id_local') && !item.hasOwnProperty('id')
    );
    if (this.studioBookings.length == 0) {
      this.isBook = false;
    } else {
      this.isBook = true;
    }

    this.specialistServices = this.cartItems.filter((item) =>
      item.hasOwnProperty('id')
    );
    console.log(this.specialistServices);
  }

  placeOrder() {
    const userId = this.tokenService.getUserId();
    this.userService.getClient(userId).subscribe(
      (data) => {
        const client = data.id.toString();
        console.log(client);

        const specialistIds = this.specialistServices.map((item) => item.id);
        const comment = this.comment;

        let startTime, endTime, bookingDate, idLocation;

        if (!this.isBook) {
          startTime = this.startTime;
          endTime = this.endTime;
          bookingDate = this.bookingDate;
          idLocation = '';
        } else if (this.studioBookings.length === 1) {
          startTime = this.studioBookings[0].startTime;
          endTime = this.studioBookings[0].endTime;
          bookingDate = this.studioBookings[0].bookingDate;
          idLocation = this.studioBookings[0].id_local;
        }

        const orderData = {
          clientId: client,
          specialistIds: specialistIds,
          startDate: startTime,
          endDate: endTime,
          completionDate: bookingDate,
          location: idLocation,
          comment: comment,
        };

        console.log(orderData);

        this.orderService.createOrder(orderData).subscribe(
          (response: any) => {
            console.log(
              'The order has been successfully created. Order number:',
              response.orderId
            );
            this.number_order = response.orderId;
            this.isSuccessful = true;
            this.cartService.clearCart();
            // Добавьте дополнительную логику, если необходимо
          },
          (error) => {
            console.error('Ошибка при создании заказа:', error);
            // Обработайте ошибку, если необходимо
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
