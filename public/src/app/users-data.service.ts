import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http:HttpClient) { }

  loginUser(user:User):Observable<User> {
    return this.http.post<User>(environment.BASE_API_URL+environment.USER_API_ENDPOINT, user);
  }

  registerUser(user:User):Observable<User> {
    return this.http.post<User>(environment.BASE_API_URL+environment.REGISTER_API_ENDPOINT, user)
  }
}
