import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { App, Movie } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppsDataService {

  constructor(private httpClient:HttpClient) { }

  getAllApps():Observable<App[]> {
    return this.httpClient.get<App[]>(environment.BASE_API_URL+"apps");
  }

  getOneApp(appId:string):Observable<App> {
    return this.httpClient.get<App>(environment.BASE_API_URL+"apps/"+appId)
  }

  getOneMovie(appId:string, movieId:string):Observable<Movie> {
    return this.httpClient.get<Movie>(environment.BASE_API_URL+`apps/${appId}/movies/${movieId}`)
  }
}