import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';

@Component({
  selector: 'app-ddd-app',
  templateUrl: './ddd-app.component.html',
  styleUrls: ['./ddd-app.component.css']
})
export class DDDAppComponent implements OnInit {

  app!:App;

  constructor(private appsDataService:AppsDataService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getApp();
  }

  getApp():void {
    const appId:string = this.router.snapshot.params["appId"];
    this.appsDataService.getOneApp(appId).subscribe({
      next: app => this.app = app,
      error: err => console.log("Service error", err),
      complete: () => console.log("App retrieved")     
    });
  }
}
