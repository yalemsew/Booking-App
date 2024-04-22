import { Injectable } from '@angular/core';
import { Bike, BikeResponse } from '../helper/types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  constructor(private httpClient: HttpClient) {
    console.log('new service instance created');
  }

  getBikes(): Observable<BikeResponse> {
    console.log('Calling bike list service');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<BikeResponse>('http://localhost:3000/bike', {
      headers: headers,
    });
  }
}

//  updateBikes(id: string) {
//     // const product = await fetch(`http://localhost:3000/api/products/${id}`, {
//     //   method: 'put',
//     // });
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.httpClient.put<Bike>(`http://localhost:3000/api/products/${id}`,{headers:headers},{})
//   }
