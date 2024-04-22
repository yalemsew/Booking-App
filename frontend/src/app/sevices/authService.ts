import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { User } from '../helper/types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host = 'http://localhost:3000/users/signin';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>(this.host, { email, password });
    //   .pipe(do((res) => this.setSession))
    //   .shareReplay();
  }

  private setSession(authResult: any) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(new Date().valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    // return moment().isBefore(this.getExpiration());
    return true;
  }

  isLoggedOut() {
    // return !this.isLoggedIn();
  }
  isAdmin(): boolean {
    return true;
  }
  //   getExpiration() {
  //     const expiration = localStorage.getItem('expires_at');
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  //   }
}
