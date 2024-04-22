import { HttpClient } from "@angular/common/http";
import { Injectable, effect, inject, signal } from "@angular/core";
import * as moment from "moment";
import { StandardResponse, State, User, initial_state } from "../helper/types";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  // host = "http://localhost:3000/users/signin";

  #hostSignin = "http://localhost:3000/users/signin";
  #hostSignup = "http://localhost:3000/users/signup";
  readonly #http = inject(HttpClient);
  $state = signal<State>(initial_state);

  signin(credentials: { email: string; password: string }) {
    return this.#http.post<StandardResponse>(this.#hostSignin, credentials);
  }

  is_signed_in() {
    return this.$state().token ? true : false;
  }

  signup(data: { fullname: string; email: string; password: string }) {
    return this.#http.post<StandardResponse>(this.#hostSignup, data);
  }

  constructor(private http: HttpClient) {
    effect(() => {
      localStorage.setItem("DUMMY_STATE", JSON.stringify(this.$state()));
    });
  }
  isAdmin(): boolean {
    return this.$state().usertype == "admin";
  }

  parseJwt(token: string) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      return null; // or handle the error in a way that's appropriate for your app
    }
  }

  // login(email: string, password: string) {
  //   return this.http.post<User>(this.host, { email, password });
  //   //   .pipe(do((res) => this.setSession))
  //   //   .shareReplay();
  // }

  // private setSession(authResult: any) {
  //   // const expiresAt = moment().add(authResult.expiresIn, 'second');

  //   localStorage.setItem("id_token", authResult.idToken);
  //   localStorage.setItem("expires_at", JSON.stringify(new Date().valueOf()));
  // }

  // logout() {
  //   localStorage.removeItem("id_token");
  //   localStorage.removeItem("expires_at");
  // }

  // public isLoggedIn(): boolean {
  //   // return moment().isBefore(this.getExpiration());
  //   return true;
  // }

  // isLoggedOut() {
  //   // return !this.isLoggedIn();
  // }

  //   getExpiration() {
  //     const expiration = localStorage.getItem('expires_at');
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  //   }
}
