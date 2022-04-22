import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ddd-app',
  templateUrl: './ddd-app.component.html',
  styleUrls: ['./ddd-app.component.css']
})
export class DDDAppComponent implements OnInit {

  app!:App;

  get isLoggedIn() { return this.authService.isLoggedIn; }

  constructor(private appsDataService:AppsDataService, private authService:AuthService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getApp();
  }

  getApp():void {
    const appId:string = this.router.snapshot.params["appId"];
    this.appsDataService.getOneApp(appId).subscribe({
      next: app => this._onGetAppNext(app),
      error: err => this._onGetAppError(err),
      complete: () => this._onGetAppComplete()
    });
  }
  
  private _onGetAppNext = (app: App) => this.app = app;
  private _onGetAppError = (err: string) => console.log(environment.MSG_SERVICE_ERROR, err);
  private _onGetAppComplete = () => console.log(environment.MSG_APP_RETRIEVED);
}
