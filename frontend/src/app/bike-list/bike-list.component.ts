import { Component, OnInit, inject } from "@angular/core";
import { Bike, StandardResponse } from "../helper/types";
import { BikeService } from "../sevices/bikeService";
import { Router } from "@angular/router";
import { AuthService } from "../sevices/authService";
import { BookingService } from "../sevices/bookingService";

@Component({
  selector: "app-bike-list",
  standalone: true,
  imports: [],
  templateUrl: "./bike-list.component.html",
  styleUrl: "./bike-list.component.css",
})
export class BikeListComponent implements OnInit {
  bikeList: Bike[] = [];
  #router = inject(Router);
  bikeService = inject(BikeService);
  authService = inject(AuthService);
  bookService = inject(BookingService);

  //initialize the view
  ngOnInit(): void {
    this.getAllBikes();
  }

  getAllBikes() {
    this.bikeService
      .getBikes()
      .subscribe((data) => (this.bikeList = data.data));
  }

  updateBike(bike: Bike) {
    this.bikeService.bikeData = bike;
    this.#router.navigate(["bikeForm"]);
  }

  deleteBike(bike_id: string) {
    return this.bikeService.deleteBike(bike_id).subscribe((data) => {
      this.getAllBikes();
      this.#router.navigate(["home"]);
    });
  }

  bookBike(bike_id: string) {
    return this.bookService.postBooking(bike_id).subscribe((data) => {
      this.#router.navigate(["bookList"]);
    });
  }
}
