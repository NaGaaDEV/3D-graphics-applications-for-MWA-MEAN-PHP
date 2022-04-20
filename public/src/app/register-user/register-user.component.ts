import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'

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
  registeringMessage:string = "";

  constructor(private usersDataService:UsersDataService, private location:Location) { }

  ngOnInit(): void {
  }

  onRegister(form:NgForm): void {
    const newUser:User = {
      name: form.value.name,
      username: form.value.username,
      password: form.value.password,
    }
    
    this.usersDataService.registerUser(newUser).subscribe({
      error: err => this._onUserServiceWriteError(err),
      complete: () => this._onUserServiceWriteComplete()
    })
  }

  private _onUserServiceWriteError = (err: any) => {
    this.registering = false;
    this.registeringMessage = environment.MSG_ERROR_REGISTERING_USER;
  };
  private _onUserServiceWriteComplete = () => {
    this.registering = false;
    this.registeringMessage = environment.MSG_USER_REGISTERED
    setTimeout(() => this.location.replaceState("/login"), 2000);
  };
}
