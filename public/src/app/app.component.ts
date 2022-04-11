import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '3Dapps';

  constructor(private location: Location) {}

  onBack() {
    this.location.back();
  }
}
