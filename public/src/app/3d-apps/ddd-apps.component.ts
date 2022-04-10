import { Component, OnInit } from '@angular/core';
import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';

@Component({
  selector: 'app-ddd-apps',
  templateUrl: './ddd-apps.component.html',
  styleUrls: ['./ddd-apps.component.css']
})
export class DDDAppsComponent implements OnInit {

  apps!: App[];
  
  constructor(private appsDataService:AppsDataService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames():void {
    this.appsDataService.getAllApps().subscribe({
      next: apps => {this.apps = apps;},
      error: err => console.log("Service error", err),
      complete: () => console.log("Apps retrieved")
    });
  }

}
