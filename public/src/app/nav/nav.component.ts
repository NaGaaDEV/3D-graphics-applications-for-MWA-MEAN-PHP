import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  get isLoggedIn() { return this.authService.isLoggedIn; }

  get name() { return this.authService.name; }

  constructor(private authService:AuthService, private location: Location, private navigator: Router) {}
  
  ngOnInit(): void {
  }

  onLogout():void {
    this.authService.clearToken();
    this.navigator.navigate(['/apps'])
  }

  onBack() {
    this.location.back();
  }

}
