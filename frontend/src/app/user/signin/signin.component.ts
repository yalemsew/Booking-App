import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/authService";
import { Router } from "@angular/router";
import { State } from "../../helper/types";

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

  onSubmit() {
    this.authService
      .signin(this.myForm.value as { email: string; password: string })
      .subscribe((response) => {
        const decodedToken: State = this.authService.parseJwt(response.data);
        const tokenData = {
          id: decodedToken.id,
          fullname: decodedToken.fullname,
          usertype: decodedToken.usertype,
          token: response.data,
        };
        //update the state with new user state
        this.authService.$state.set(tokenData);
        // this.authService.saveTokenData(tokenData);

        this.#router.navigate(["", "home"]);
      });
  }
}
