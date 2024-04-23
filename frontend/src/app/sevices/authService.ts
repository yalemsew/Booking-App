import { HttpClient } from "@angular/common/http";
import { Injectable, effect, inject, signal } from "@angular/core";
import * as moment from "moment";
import { StandardResponse, State, User, initial_state } from "../helper/types";
import { Token } from "@angular/compiler";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  #hostSignin = "http://localhost:3000/users/signin";
  #hostSignup = "http://localhost:3000/users/signup";
  readonly #http = inject(HttpClient);
  $state = signal<State>(initial_state);
  TOKEN_DATA: string = "TOKEN_DATA";

  constructor(private http: HttpClient, private router: Router) {
    const tokenData: string | null = localStorage.getItem("TOKEN_DATA");
    if (tokenData) {
      const parsedTokenData: State = JSON.parse(tokenData);
      if (parsedTokenData.token) {
        this.$state.set(parsedTokenData);
      }
    }

    effect(() => {
      localStorage.setItem(this.TOKEN_DATA, JSON.stringify(this.$state()));
    });
  }

  signup(data: { fullname: string; email: string; password: string }) {
    return this.#http.post<StandardResponse>(this.#hostSignup, data);
  }
  signin(credentials: { email: string; password: string }) {
    return this.#http.post<StandardResponse>(this.#hostSignin, credentials);
  }

  is_signed_in() {
    return this.$state().token ? true : false;
  }

  saveTokenData(state: State) {
    localStorage.setItem(this.TOKEN_DATA, JSON.stringify(state));
  }

  getTokenData() {
    const tokenData = localStorage.getItem("token");
    if (!tokenData) {
      return undefined;
    }
    return tokenData;
  }

  isAdmin(): boolean {
    return this.$state().usertype == "admin";
  }

  isUser(): boolean {
    return this.$state().usertype == "user";
  }

  //return jsonpayload data with the token itself
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
      return null;
    }
  }
}
