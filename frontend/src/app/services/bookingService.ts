import { Injectable, inject } from "@angular/core";
import { Booking, BookingResponse, StandardResponse } from "../helper/types";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { addTokenInterceptor } from "./token.interceptor";
import { AuthService } from "./authService";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  userId: string = this.authService.$state().id;

  #hostBooking = "http://localhost:3000/booking";

  postBooking(bike_id: string) {
    return this.httpClient.post<StandardResponse>(this.#hostBooking, {
      bike_id,
    });
  }

  getBookings(): Observable<BookingResponse> {
    return this.httpClient.get<any>(this.#hostBooking);
  }

  deleteBooking(booking_id: string) {
    console.log("Booking deleted");
    const url = `${this.#hostBooking}/${booking_id}`;
    return this.httpClient.delete<StandardResponse>(url);
  }
}
