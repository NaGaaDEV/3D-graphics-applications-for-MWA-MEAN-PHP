import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Movie } from '../app.model';
import { AppsDataService } from '../apps-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie!:Movie;

  constructor(private appsDataService:AppsDataService, private router:ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie():void {
    const appId:string = this.router.snapshot.params["appId"];
    const movieId:string = this.router.snapshot.params["movieId"];
    this.appsDataService.getOneMovie(appId, movieId).subscribe({
      next: movie => this._onGetAppsNext(movie),
      error: err => this._onGetAppsError(err),
      complete: () => this._onGetAppsComplete()
    });
  }
  
  private _onGetAppsNext = (movie: Movie) => this.movie = movie;
  private _onGetAppsError = (err: any) => console.log(environment.MSG_SERVICE_ERROR, err);
  private _onGetAppsComplete = () => console.log(environment.MSG_MOVIE_RETRIEVED);
}
