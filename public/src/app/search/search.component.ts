import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  apps!:App[];

  constructor(private appsDataService:AppsDataService) { }

  ngOnInit(): void {
  }

  searchApp(searchForm:NgForm): void {
    this.appsDataService.searchAppByName(searchForm.value).subscribe({
      next: apps => this._onGetAppsNext(apps),
      error: err => this._onGetAppsError(err),
      complete: () => this._onGetAppsComplete()
    });
  }
  
  private _onGetAppsNext = (apps: App[]) => this.apps = apps;
  private _onGetAppsError = (err: any) => console.log(environment.MSG_SERVICE_ERROR, err);
  private _onGetAppsComplete = () => console.log(environment.MSG_SEARCH_COMPLETE);
}
