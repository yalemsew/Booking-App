import { Component, inject, signal, OnInit } from "@angular/core";
import { RouterOutlet, RouterModule } from "@angular/router";
import { SignupComponent } from "./user/signup/signup.component";
import { initFlowbite } from "flowbite";
import { AuthService } from "./services/authService";
import { initial_state } from "./helper/types";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SignupComponent, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",

  providers: [], //local injector
})
export class AppComponent implements OnInit {
  title = "new-app";

  authService = inject(AuthService);

  constructor() {}
  ngOnInit(): void {
    initFlowbite();
  }

  signout() {
    this.authService.$state.set(initial_state);
  }
}
