import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { initial_state, StandardResponse, State } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #host = 'http://localhost:3000/users/signin';
  readonly #http = inject(HttpClient);

  $state = signal<State>(initial_state);

  constructor() {
    effect(() => {
      localStorage.setItem('DUMMY_STATE', JSON.stringify(this.$state()));
    });
  }

  signin(credentials: { email: string; password: string }) {
    return this.#http.post<StandardResponse>(this.#host, credentials);
  }

  is_signed_in() {
    return this.$state().token ? true : false;
  }
}
