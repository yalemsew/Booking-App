import { Component, inject } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../helper/types";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.css",
})
export class UserListComponent {
  userService = inject(UserService);
  #router = inject(Router);
  userList: User[] = [];

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService
      .getUsers()
      .subscribe((data) => (this.userList = data.data));
  }
  deleteUser(user_id: string) {
    return this.userService.deleteUser(user_id).subscribe((data) => {
      this.getAllUsers();
      this.#router.navigate(["userList"]);
    });
  }
}
