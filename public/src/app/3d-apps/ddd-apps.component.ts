import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
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
    this.getApps();
  }
  
  getApps():void {
    this.appsDataService.getAllApps().subscribe({
      next: apps => this._onGetAppsNext(apps),
      error: err => this._onGetAppsError(err),
      complete: () => this._onGetAppsComplete()
    });
  }
  
  private _onGetAppsNext = (apps: App[]) => this.apps = apps;
  private _onGetAppsError = (err: any) => console.log(environment.MSG_SERVICE_ERROR, err);
  private _onGetAppsComplete = () => console.log(environment.MSG_APP_RETRIEVED);
}
