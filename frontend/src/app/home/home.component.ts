import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { BikeListComponent } from "../bike-list/bike-list.component";
import { AuthService } from "../services/authService";
import { initial_state } from "../helper/types";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterModule, BikeListComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  authService = inject(AuthService);
  #router = inject(Router);

  //reset the state
  signout() {
    this.authService.$state.set(initial_state);
  }

  addBike() {
    console.log("add button clicked");
    this.#router.navigate(["bikeForm"]);
  }

  bookList() {
    console.log("add button clicked");
    this.#router.navigate(["bookList"]);
  }
  userList() {
    this.#router.navigate(["userList"]);
  }
}
