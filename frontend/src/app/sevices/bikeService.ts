import { Injectable, inject } from "@angular/core";
import { Bike, BikeResponse } from "../helper/types";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BikeService {
  httpClient = inject(HttpClient);

  getBikes(): Observable<BikeResponse> {
    console.log("Calling bike list service");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.get<BikeResponse>("http://localhost:3000/bike", {
      headers: headers,
    });
  }
  addBikes(newBike: Bike) {
    console.log("bike list service");
  }
}
