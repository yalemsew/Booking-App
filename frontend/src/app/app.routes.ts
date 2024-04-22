import { Routes } from "@angular/router";
import { SigninComponent } from "./user/signin/signin.component";
import { SignupComponent } from "./user/signup/signup.component";
// import { AuthService } from './helper/auth';
import { inject } from "@angular/core";
import { OuchComponent } from "./helper/ErrorPage";
import { BikeComponent } from "./bike/bike.component";
import { BikeListComponent } from "./bike-list/bike-list.component";
import { HomeComponent } from "./home/home.component";
import { BookingListComponent } from "./user-home/booking-list/booking-list.component";
import { BikeFormComponent } from "./bike/bike-form/bike-form.component";
import { BookListComponent } from "./booking/book-list/book-list.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "bike", component: BikeComponent },
  { path: "bikeForm", component: BikeFormComponent },
  { path: "bikeList", component: BikeListComponent },
  { path: "bookList", component: BookListComponent },

  { path: "**", component: OuchComponent },
];
