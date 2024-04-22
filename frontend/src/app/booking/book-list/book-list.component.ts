import { HttpClient } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { addTokenInterceptor } from "../../sevices/token.interceptor";
import { Booking } from "../../helper/types";
import { BookingService } from "../../sevices/bookingService";
import { AuthService } from "../../sevices/authService";
import { Router } from "@angular/router";

@Component({
  selector: "app-book-list",
  standalone: true,
  imports: [],
  templateUrl: "./book-list.component.html",
  styleUrl: "./book-list.component.css",
})
export class BookListComponent {
  http = inject(HttpClient);
  // interceptor = inject(addTokenInterceptor);

  BookingList: Booking[] = [];
  #router = inject(Router);
  bookingService = inject(BookingService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((data) => {
      {
        this.BookingList = data.data;
        console.log("========getBookings data fetched=========");
        console.log(JSON.stringify(data.data));
        console.log("array data", this.BookingList);
      }
    });
  }

  deleteBooking(booking_id: string) {
    console.log("add button clicked");
    this.#router.navigate(["BookingForm"]);
  }

  updateBooking(booking_id: string) {
    console.log("add button clicked");
    this.#router.navigate(["BookingForm"]);
  }
}
