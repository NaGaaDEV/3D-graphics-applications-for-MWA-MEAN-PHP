import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';


@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.component.html',
  styleUrls: ['./manage-app.component.css']
})
export class ManageAppComponent implements OnInit {

  appForm!:FormGroup;
  movieForm!:FormGroup;
  newMoviesForm!:FormGroup;
  
  appId!:string;
  app!:App;

  saving:boolean = false;
  savingMessage:string = "";

  constructor(private fb:FormBuilder, private appsDataService:AppsDataService, private router:ActivatedRoute, private navigator:Router, private location:Location) { }

  ngOnInit(): void {
    this.appId = this.router.snapshot.params["appId"];
    
    this.appForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      initialReleaseDate: this.fb.control(''),
      logo: this.fb.control(''),
      movies: this.fb.array([])
    });
    this.movieForm = this.fb.group({
      _id: this.fb.control('', Validators.required),
      title: this.fb.control('', Validators.required),
      trailer: this.fb.control('', [Validators.minLength(11), Validators.maxLength(11)])  
    });
    this.newMoviesForm = this.fb.group({
      movies: this.fb.array([])
    });
    if(this.appId) { this.getApp(); }
  }

  onAdd():void {
    this.savingMessage = environment.MSG_SAVING
    this.saving = true;
    this.appForm.value.movies = this.appForm.value.movies || "";
    this.appsDataService.addOneApp(this.appForm.value).subscribe({
      next: (app) => this._onAppServiceWriteNext(app),
      error: err => this._onAppServiceWriteError(err),
      complete: () => this._onAppServiceWriteComplete()
    })
  }

  onUpdate():void {
    this.savingMessage = environment.MSG_SAVING;
    this.saving = true;
    
    let patchedAppData = { ...this.app, ...this.appForm.value, movies:[...this.appForm.value.movies, ...this.newMovies.value] };
    
    this.appsDataService.updateOneApp(this.appId, patchedAppData).subscribe({
      error: err => this._onAppServiceWriteError(err),
      complete: () => this._onAppServiceWriteComplete()
    })
  }

  onSave():void {
    this.app ? this.onUpdate() : this.onAdd();
  }

  private _onAppServiceWriteNext = (app: App) => {
    this.app = app;
    this.appId = app._id;
  };
  private _onAppServiceWriteError = (err: any) => {
    this.saving = false;
    this.savingMessage = environment.MSG_ERROR_SAVING_APP;
  };
  private _onAppServiceWriteComplete = () => {
    this.saving = false;
    this.savingMessage = environment.MSG_APP_SAVED;
    this.location.replaceState("/apps/manage/"+this.appId);
  };

  onDelete():void {
    if(this.appId) {
      this.appsDataService.deleteOneApp(this.appId).subscribe({
        next: app => this._onAppServiceNext(app),
        error: err => this._onAppServiceError(err),
        complete: () => this.navigator.navigate(['/apps'])
      });
    }
  }

  getApp():void {
    const appId:string = this.router.snapshot.params["appId"];
    this.appsDataService.getOneApp(appId).subscribe({
      next: app => this._onAppServiceNext(app),
      error: err => this._onAppServiceError(err),
      complete: () => {
        this._onAppServiceComplete();
        this.patchForm();
      }     
    });
  }

  private _onAppServiceNext = (app: App) => this.app = app;
  private _onAppServiceError = (err: any) => console.log(environment.MSG_SERVICE_ERROR, err);
  private _onAppServiceComplete = () => console.log(environment.MSG_APP_RETRIEVED);

  patchForm():void {
    this.appForm.patchValue(this.app);
    this.app.movies.forEach( movie => this.movies.push(this.fb.group({_id: movie._id, title: movie.title, trailer: movie.trailer})) );
  }

  onAddMovie():void {
    const newMovieForm = this.fb.group({
        title: this.fb.control('', Validators.required),
        trailer: this.fb.control('', [Validators.minLength(11), Validators.maxLength(11)])  
    });
    this.newMovies.push(newMovieForm);
  }
  onDeleteMovie(index:number):void {
    this.movies.removeAt(index);
  }
  onDeleteNewMovie(index:number):void {
    this.newMovies.removeAt(index);
  }

  get movies() : FormArray {
    return this.appForm.controls["movies"] as FormArray;
  }
  get newMovies() : FormArray {
    return this.newMoviesForm.controls["movies"] as FormArray;
  }

}
