import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { UserResponse, UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message = "";
  constructor(private usersDataService:UsersDataService, private authService:AuthService, private navigator:Router) { }

  onLogin(form:NgForm):void {
    this.usersDataService.loginUser(form.value).subscribe({
      next: response => this.handleLoginNext(response),
      error: err => this.loginFailed(),
      complete: () => console.log("login done")      
    })
  }

  private handleLoginNext(response:UserResponse):void {
    if(response.success) this.loginSucceed(response.token)
    else this.loginFailed();
  }

  private loginSucceed(token:string):void {
      this.authService.token = token;
      this.navigator.navigate(['/apps']);
  }
  private loginFailed():void {
    this.message = environment.MSG_LOGIN_UNSUCCESSFUL
  }
}
