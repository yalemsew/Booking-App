// import { Routes } from "@angular/router";
// import { inject } from "@angular/core";
// import { AuthService } from "./sevices/authService";
// import { OuchComponent } from "./helper/ErrorPage";
// import { BikeListComponent } from "./bike-list/bike-list.component";
// import { HomeComponent } from "./home/home.component";
// import { BookListComponent } from "./booking/book-list/book-list.component";
// import { BikeFormComponent } from "./bike/bike-form/bike-form.component";
// import { AuthGuardService } from "./sevices/authGuardService";
// import { SigninComponent } from "./user/signin/signin.component";
// import { SignupComponent } from "./user/signup/signup.component";
// import { Role } from "./helper/types";

// export const routes: Routes = [
//     // { path: "", redirectTo: "home", pathMatch: "full" },
//     // { path: "home", canActivate: [() => inject(AuthService).is_signed_in() || !inject(AuthService).is_signed_in()], component: HomeComponent, },
//     // { path: "signin", component: SigninComponent },
//     // { path: "signup", component: SignupComponent },
//     // { path: "bikeForm", canActivate: [() => inject(AuthService).isAdmin()], component: BikeFormComponent, },
//     // { path: "bikeList", canActivate: [() => inject(AuthService).is_signed_in()], component: BikeListComponent, },
//     // { path: "bookList", canActivate: [() => inject(AuthService).isUser()], component: BookListComponent, },
//     // { path: "**", component: OuchComponent },

//     {
//         path: "",
//         redirectTo: "home",
//         pathMatch: "full"
//     }, {
//         path: "home",
//         canActivate: [() => inject(AuthService).is_signed_in() || !inject(AuthService).is_signed_in()],
//         loadComponent: () => import("./home/home.component").then(c => c.HomeComponent),
//     }, {
//         path: "signin",
//         loadComponent: () => import("./user/signin/signin.component").then(c => c.SigninComponent),
//     }, {
//         path: "signup",
//         loadComponent: () => import("./user/signup/signup.component").then(c => c.SignupComponent),
//     }, {
//         path: "bikeForm",
//         canActivate: [() => inject(AuthService).isAdmin()],
//         loadComponent: () => import("./bike/bike-form/bike-form.component").then(c => c.BikeFormComponent),
//     }, {
//         path: "bikeList",
//         canActivate: [() => inject(AuthService).is_signed_in()],
//         data: { roles: [Role.user] },
//         loadComponent: () => import("./bike-list/bike-list.component").then(c => c.BikeListComponent),
//     }, {
//         path: "bookList",
//         canActivate: [AuthGuardService],
//         loadComponent: () => import("./booking/book-list/book-list.component").then(c => c.BookListComponent)
//     }, {
//         path: "**",
//         loadComponent: () => import("./helper/ErrorPage").then(c => c.OuchComponent),
//     },

// ];

import { Routes } from "@angular/router";
import { SigninComponent } from "./user/signin/signin.component";
import { SignupComponent } from "./user/signup/signup.component";
import { inject } from "@angular/core";
import { OuchComponent } from "./helper/ErrorPage";
import { BikeListComponent } from "./bike-list/bike-list.component";
import { HomeComponent } from "./home/home.component";
import { BookListComponent } from "./booking/book-list/book-list.component";
import { BikeFormComponent } from "./bike/bike-form/bike-form.component";
import { AuthGuardService } from "./services/authGuardService";
import { Role } from "./helper/types";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    canActivate: [AuthGuardService],
    data: { roles: [""] },
    loadComponent: () =>
      import("./home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "signin",
    loadComponent: () =>
      import("./user/signin/signin.component").then((c) => c.SigninComponent),
  },
  {
    path: "signup",
    loadComponent: () =>
      import("./user/signup/signup.component").then((c) => c.SignupComponent),
  },
  {
    path: "userList",
    loadComponent: () =>
      import("./user/user-list/user-list.component").then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: "bikeForm",
    canActivate: [AuthGuardService],
    data: { roles: [Role.admin] },
    loadComponent: () =>
      import("./bike/bike-form/bike-form.component").then(
        (c) => c.BikeFormComponent
      ),
  },
  {
    path: "bikeList",
    canActivate: [AuthGuardService],
    data: { roles: [Role.admin || Role.user] },
    loadComponent: () =>
      import("./bike-list/bike-list.component").then(
        (c) => c.BikeListComponent
      ),
  },
  {
    path: "bookList",
    canActivate: [AuthGuardService],
    data: { roles: [Role.user] },
    loadComponent: () =>
      import("./booking/book-list/book-list.component").then(
        (c) => c.BookListComponent
      ),
  },

  {
    path: "**",
    loadComponent: () =>
      import("./helper/ErrorPage").then((c) => c.OuchComponent),
  },
];
