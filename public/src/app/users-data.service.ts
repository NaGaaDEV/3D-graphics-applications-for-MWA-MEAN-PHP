import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private httpClient:HttpClient) { }

  loginUser(user:User):Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(environment.BASE_API_URL+environment.USER_LOGIN_API_ENDPOINT, user);
  }

  registerUser(user:User):Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(environment.BASE_API_URL+environment.REGISTER_API_ENDPOINT, user)
  }
}

export class UserResponse {
  success!: boolean;
  token!: string;
}
