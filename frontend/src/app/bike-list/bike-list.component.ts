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

  ngOnInit(): void {
    this.bikeService.getBikes().subscribe((data) => {
      {
        this.bikeList = data.data;
        console.log("========getBikes data fetched=========");
        console.log(JSON.stringify(data));
      }
    });
    console.log(this.bikeList[3]);
  }

  updateBike() {
    console.log("add button clicked");
    this.#router.navigate(["bikeForm"]);
  }
  deleteBike(bike_id: string) {
    return this.bikeService.deleteBike(bike_id).subscribe((data) => {
      console.log(data);
    });
  }
  bookBike(bike_id: string) {
    return this.bookService.postBooking(bike_id).subscribe((data) => {
      console.log(data);
      this.#router.navigate(["bookList"]);
    });
  }
}
