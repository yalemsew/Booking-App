import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-bike-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./bike-form.component.html",
  styleUrl: "./bike-form.component.css",
})
export class BikeFormComponent {
  myForm: FormGroup;
  constructor() {
    // Initialize an empty FormGroup here
    this.myForm = new FormGroup({
      plate_number: new FormControl("", Validators.required),
      color: new FormControl("", [Validators.required]),
      status: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.myForm.value);
    // You can add code here to submit the form data to a server or do something else with it
  }
}
