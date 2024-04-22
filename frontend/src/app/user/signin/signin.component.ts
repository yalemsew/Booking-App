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
  #auth = inject(AuthService);
  #router = inject(Router);
  from = inject(FormBuilder).nonNullable.group({
    name: "",
    email: "yalem@miu.edu",
    password: "",
  });
  myForm: FormGroup;
  constructor(public authService: AuthService) {
    // Initialize an empty FormGroup here
    this.myForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl("yalem@miu.edu", [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("1234abcd", Validators.required),
    });
  }

  onSubmit() {
    this.#auth
      .signin(this.myForm.value as { email: string; password: string })
      .subscribe((response) => {
        const decodedToken = this.#auth.parseJwt(response.data);
        //   console.log(decodedToken);
        this.#auth.$state.set({
          id: decodedToken.id,
          fullname: decodedToken.fullname,
          usertype: decodedToken.usertype,
          token: response.data,
        });

        this.#router.navigate(["", "home"]);
      });
    // this.authService.login()
    // this.router.navigate(['/updateProduct']);
    // You can add code here to submit the form data to a server or do something else with it
  }
}
