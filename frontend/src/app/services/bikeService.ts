import { Injectable, OnDestroy, inject, signal } from "@angular/core";
import { Bike, BikeResponse, StandardResponse } from "../helper/types";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BikeService {
  bikeData: Bike | undefined; //this going to be add or updated

  httpClient = inject(HttpClient);
  #hostBike = "http://localhost:3000/bike";
  //get bike
  getBikes(): Observable<BikeResponse> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.get<BikeResponse>("http://localhost:3000/bike", {
      headers: headers,
    });
  }
  //adding bike
  postBikes(newBike: Partial<Bike>) {
    return this.httpClient.post<StandardResponse>(this.#hostBike, newBike);
  }

  //delete bike
  deleteBike(bike_id: string) {
    const url = `${this.#hostBike}/${bike_id}`;
    return this.httpClient.delete<StandardResponse>(url);
  }

  updateBike(bike: Partial<Bike>) {
    const url = `${this.#hostBike}/${this.bikeData?._id || "__"}`;

    return this.httpClient.put<StandardResponse>(url, bike);
  }
}
