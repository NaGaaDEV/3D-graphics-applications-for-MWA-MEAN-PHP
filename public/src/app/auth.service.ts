import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #isLoggedIn:boolean = false;
  
  constructor(private jwtService:JwtHelperService) { 
    this.isLoggedIn = this.token ? true : false;
  }

  set isLoggedIn(loggedIn) { this.#isLoggedIn = loggedIn; }
  get isLoggedIn() { return this.#isLoggedIn; }

  set token(token) {
    localStorage.setItem(environment.TOKEN_KEY_ON_LOCAL_STORAGE, token);
    this.isLoggedIn = true;
  }
  get token() { return localStorage.getItem(environment.TOKEN_KEY_ON_LOCAL_STORAGE) as string; }

  get name() { return this.token ? this.jwtService.decodeToken(this.token).name : "Unknown"; }
  
  clearToken() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
