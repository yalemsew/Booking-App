import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {
  BikeResponse,
  StandardResponse,
  User,
  UserResponse,
} from "../helper/types";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  httpClient = inject(HttpClient);
  userList: User[] = [];
  #hostUser = "http://localhost:3000/user/users";

  getUsers(): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(this.#hostUser);
  }
  deleteUser(user_id: string) {
    const url = `${this.#hostUser}/${user_id}`;
    return this.httpClient.delete<StandardResponse>(url);
  }
}
