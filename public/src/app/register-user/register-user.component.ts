import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registering:boolean = false;
  message:string = "";

  constructor(private usersDataService:UsersDataService, private navigator:Router) { }

  ngOnInit(): void {
  }

  onRegister(form:NgForm): void {
    if(this.isFormValid(form)) {
      const newUser:User = {
        name: form.value.name,
        username: form.value.username,
        password: form.value.password,
      }
      
      this.usersDataService.registerUser(newUser).subscribe({
        error: err => this._onUserServiceRegisterError(err),
        complete: () => this._onUserServiceRegisterComplete()
      });
    }
  }

  private _onUserServiceRegisterError = (err: string) => {
    this.registering = false;
    this.message = environment.MSG_ERROR_REGISTERING_USER;
  };
  private _onUserServiceRegisterComplete = () => {
    this.registering = false;
    this.message = environment.MSG_USER_REGISTERED
    setTimeout(() => this.navigator.navigate(['/login']), 2000);
  };

  isFormValid(form:NgForm):boolean {
    if(form.value.name && form.value.username && form.value.password && form.value.confirmPassword) {
      if(form.value.password == form.value.confirmPassword) return true;
      else {
        this.message = environment.MSG_PASSWORD_DOES_NOT_MATCH;
        return false;
      }
    } else {
      this.message = environment.MSG_ALL_FIELDS_REQUIRED;
      return false;
    }
  }
}
