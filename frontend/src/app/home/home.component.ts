import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BikeListComponent } from '../bike-list/bike-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, BikeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
