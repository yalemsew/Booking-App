import { Routes } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./sevices/authService";
import { OuchComponent } from "./helper/ErrorPage";
import { BikeListComponent } from "./bike-list/bike-list.component";
import { HomeComponent } from "./home/home.component";
import { BookListComponent } from "./booking/book-list/book-list.component";
import { BikeFormComponent } from "./bike/bike-form/bike-form.component";
import { AuthGuardService } from "./sevices/authGuardService";
import { SigninComponent } from "./user/signin/signin.component";
import { SignupComponent } from "./user/signup/signup.component";
import { Role } from "./helper/types";

export const routes: Routes = [
    // { path: "", redirectTo: "home", pathMatch: "full" },
    // { path: "home", canActivate: [() => inject(AuthService).is_signed_in() || !inject(AuthService).is_signed_in()], component: HomeComponent, },
    // { path: "signin", component: SigninComponent },
    // { path: "signup", component: SignupComponent },
    // { path: "bikeForm", canActivate: [() => inject(AuthService).isAdmin()], component: BikeFormComponent, },
    // { path: "bikeList", canActivate: [() => inject(AuthService).is_signed_in()], component: BikeListComponent, },
    // { path: "bookList", canActivate: [() => inject(AuthService).isUser()], component: BookListComponent, },
    // { path: "**", component: OuchComponent },

    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }, {
        path: "home",
        //canActivate: [() => inject(AuthService).is_signed_in() || !inject(AuthService).is_signed_in()],
        loadComponent: () => import("./home/home.component").then(c => c.HomeComponent),
    }, {
        path: "signin",
        loadComponent: () => import("./user/signin/signin.component").then(c => c.SigninComponent),
    }, {
        path: "signup",
        loadComponent: () => import("./user/signup/signup.component").then(c => c.SignupComponent),
    }, {
        path: "bikeForm",
        canActivate: [() => inject(AuthService).isAdmin()],
        loadComponent: () => import("./bike/bike-form/bike-form.component").then(c => c.BikeFormComponent),
    }, {
        path: "bikeList",
        canActivate: [() => inject(AuthService).is_signed_in()],
        loadComponent: () => import("./bike-list/bike-list.component").then(c => c.BikeListComponent),
    }, {
        path: "bookList",
        canActivate: [() => inject(AuthService).isUser()],
        loadComponent: () => import("./booking/book-list/book-list.component").then(c => c.BookListComponent)
    }, {
        path: "**",
        loadComponent: () => import("./helper/ErrorPage").then(c => c.OuchComponent),
    },


];
