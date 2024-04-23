import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../sevices/authService";
import { BikeService } from "../../sevices/bikeService";
import { Router } from "@angular/router";

@Component({
  selector: "app-bike-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./bike-form.component.html",
  styleUrl: "./bike-form.component.css",
})
export class BikeFormComponent {
  authService = inject(AuthService);
  bikeService = inject(BikeService);
  #router = inject(Router);
  myForm: FormGroup;
  isEdit: boolean = false;
  constructor() {
    // Initialize an empty FormGroup here
    this.myForm = new FormGroup({
      plate_number: new FormControl("", Validators.required),
      color: new FormControl("blue", [Validators.required]),
      status: new FormControl("available", Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.bikeService.bikeData) {
      this.isEdit = true;
      this.myForm.setValue({
        plate_number: this.bikeService.bikeData.plate_number,
        color: this.bikeService.bikeData.color || "",
        status: this.bikeService.bikeData.status,
      });
    }
  }
  //add and update a bike by the admin
  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      if (this.isEdit) {
        this.bikeService
          .updateBike(
            this.myForm.value as {
              plate_number: string;
              color: string;
              status: string;
            }
          )
          .subscribe((response) => {
            this.#router.navigate(["", "home"]);
          });
      } else {
        this.bikeService
          .postBikes(
            this.myForm.value as {
              plate_number: string;
              color: string;
              status: string;
            }
          )
          .subscribe((response) => {
            this.#router.navigate(["", "home"]);
          });
      }
    }
    // You can add code here to submit the form data to a server or do something else with it
  }
}
