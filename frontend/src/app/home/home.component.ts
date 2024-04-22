import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BikeListComponent } from "../bike-list/bike-list.component";
import { AuthService } from "../sevices/authService";
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

  //reset the state
  signout() {
    this.authService.$state.set(initial_state);
  }
}
