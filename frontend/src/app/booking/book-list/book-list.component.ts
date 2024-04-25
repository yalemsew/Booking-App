import { HttpClient } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { Booking } from "../../helper/types";
import { BookingService } from "../../services/bookingService";
import { AuthService } from "../../services/authService";
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

  BookingList: Booking[] = [];
  #router = inject(Router);
  bookService = inject(BookingService);
  // authService = inject(AuthService);

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.bookService
      .getBookings()
      .subscribe((data) => (this.BookingList = data.data));
  }

  deleteBooking(booking_id: string) {
    return this.bookService.deleteBooking(booking_id).subscribe((data) => {
      this.getAllBookings();
      this.#router.navigate(["bookList"]);
    });
  }

  updateBooking(booking_id: string) {
    console.log("add button clicked");
    this.#router.navigate(["BookingForm"]);
  }
}
