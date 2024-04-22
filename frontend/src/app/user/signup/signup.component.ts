import { Component, OnInit, inject } from "@angular/core";
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
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
// export class SignupComponent {
//   authService = inject(AuthService);
//   #router = inject(Router);

//   myForm = inject(FormBuilder).nonNullable.group({
//     fullname: ["", Validators.required],
//     email: ["", [Validators.required, Validators.email]],
//     password: ["", [Validators.required, Validators.minLength(6)]],
//   });

//   onSubmit() {
//     if (this.myForm.valid) {
//       this.authService
//         .signup(
//           this.myForm.value as {
//             fullname: string;
//             email: string;
//             password: string;
//           }
//         )
//         .subscribe({
//           next: (response) => {
//             this.#router.navigate(["", "signin"]);
//           },
//           error: (err) => {
//             console.error("Signup failed", err);
//           },
//         });
//     }
//   }
// }
export class SignupComponent implements OnInit {
  // Model for form data
  authService = inject(AuthService);
  #router = inject(Router);
  myForm: FormGroup;
  constructor() {
    // Initialize an empty FormGroup here
    this.myForm = new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      fullname: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  // onSubmit() {
  //   console.log(this.myForm.value);
  //   // You can add code here to submit the form data to a server or do something else with it
  // }
  onSubmit() {
    if (this.myForm.valid) {
      this.authService
        .signup(
          this.myForm.value as {
            fullname: string;
            email: string;
            password: string;
          }
        )
        .subscribe((response) => {
          console.log(response);
          // this.#router.navigate(["", "home"]);
        });
    }
  }
}