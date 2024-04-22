import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../sevices/authService";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.css",
})
export class SigninComponent {
  authService = inject(AuthService);
  #router = inject(Router);

  myForm: FormGroup;
  constructor() {
    // Initialize an empty FormGroup here
    this.myForm = new FormGroup({
      email: new FormControl("yalem@miu.edu", [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("1234abcd", Validators.required),
    });
  }

  // ngOnInit() {
  //   this.myForm = new FormGroup({
  //     email: new FormControl("yalem@miu.edu", [
  //       Validators.required,
  //       Validators.email,
  //     ]),
  //     password: new FormControl("1234abcd", Validators.required),
  //   });
  // }

  onSubmit() {
    this.authService
      .signin(this.myForm.value as { email: string; password: string })
      .subscribe((response) => {
        const decodedToken = this.authService.parseJwt(response.data);
        //update the state with new user state
        this.authService.$state.set({
          id: decodedToken._id,
          fullname: decodedToken.fullname,
          usertype: decodedToken.usertype,
          token: response.data,
        });
        console.log("userId", this.authService.$state());

        this.#router.navigate(["", "home"]);
      });
  }
}
