import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SignupComponent } from "./user/signup/signup.component";
// import { BikeComponent } from "./bike/bike.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SignupComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",

  providers: [], //local injector
})
export class AppComponent {
  title = "new-app";
  // readonly #http = inject(HttpClient);
  // $bikeList = signal<[]>([]);

  constructor() {}
}
