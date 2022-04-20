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
    return this.httpClient.get<App[]>(environment.BASE_API_URL+environment.APPS_API_ENDPOINT);
  }

  getOneApp(appId:string):Observable<App> {
    return this.httpClient.get<App>(environment.BASE_API_URL+`${environment.APPS_API_ENDPOINT}/`+appId)
  }

  getOneMovie(appId:string, movieId:string):Observable<Movie> {
    return this.httpClient.get<Movie>(environment.BASE_API_URL+`${environment.APPS_API_ENDPOINT}/${appId}/${environment.MOVIES_API_ENDPOINT}/${movieId}`)
  }

  searchAppByName(query:{name:string}):Observable<App[]> {
    return this.httpClient.get<App[]>(environment.BASE_API_URL+`${environment.APPS_API_ENDPOINT}?name=${query.name}`);
  }

  addOneApp(app:App):Observable<App> {
    return this.httpClient.post<App>(environment.BASE_API_URL+`${environment.APPS_API_ENDPOINT}`, app);
  }
  updateOneApp(appId:string, app:App):Observable<App> {
    return this.httpClient.patch<App>(environment.BASE_API_URL+`${environment.APPS_API_ENDPOINT}/${appId}`, app);
  }
  deleteOneApp(appId:string):Observable<App> {
    return this.httpClient.delete<App>(environment.BASE_API_URL+`${environment.APPS_API_ENDPOINT}/${appId}`);
  }
}