import { Injectable, inject } from "@angular/core";
import { Bike, BikeResponse, StandardResponse } from "../helper/types";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BikeService {
  httpClient = inject(HttpClient);
  #hostAddBike = "http://localhost:3000/bike";
  #hostDeleteBike = "http://localhost:3000/bike";

  //adding bike
  getBikes(): Observable<BikeResponse> {
    console.log("Calling bike list service");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.get<BikeResponse>("http://localhost:3000/bike", {
      headers: headers,
    });
  }
  postBikes(newBike: Partial<Bike>) {
    console.log("bike list service");
    return this.httpClient.post<StandardResponse>(this.#hostAddBike, newBike);
  }

  deleteBike(bike_id: string) {
    console.log("bike deleted");
    const url = `${this.#hostDeleteBike}/${bike_id}`;
    return this.httpClient.delete<StandardResponse>(url);
  }

  putBike(updatedBike: Bike) {
    console.log("updated bike");
  }
}
