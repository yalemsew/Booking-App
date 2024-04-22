import { Component, OnInit } from '@angular/core';
import { Bike } from '../helper/types';
import { BikeService } from '../sevices/bikeService';
import { Router } from '@angular/router';
import { AuthService } from '../sevices/authService';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  imports: [],
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.css',
})
export class BikeListComponent implements OnInit {
  bikeList: Bike[] = [];
  flag = true;

  constructor(
    private router: Router,
    private bikeService: BikeService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bikeService.getBikes().subscribe((data) => {
      {
        this.bikeList = data.data;
        this.flag = false;
        console.log('========getBikes data fetched=========');
        console.log(JSON.stringify(data));
      }
    });
    console.log(this.bikeList[3]);
  }
}
