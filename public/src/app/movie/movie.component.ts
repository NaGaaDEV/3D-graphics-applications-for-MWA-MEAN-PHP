import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Movie } from '../app.model';
import { AppsDataService } from '../apps-data.service';

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
      next: movie => {this.movie = movie},
      error: err => console.log("Service error", err),
      complete: () => () => console.log("Movie retrieved")
    });
  }

}
