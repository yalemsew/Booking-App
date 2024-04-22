import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../sevices/authService';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  from = inject(FormBuilder).nonNullable.group({
    name: '',
    email: 'yalem@miu.edu',
    password: '',
  });
  myForm: FormGroup;
  constructor(public authService: AuthService) {
    // Initialize an empty FormGroup here
    this.myForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    // this.authService.login()
    // this.router.navigate(['/updateProduct']);
    // You can add code here to submit the form data to a server or do something else with it
  }
}
