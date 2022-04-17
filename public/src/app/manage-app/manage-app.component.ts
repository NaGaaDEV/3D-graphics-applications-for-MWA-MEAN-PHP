import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';


@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.component.html',
  styleUrls: ['./manage-app.component.css']
})
export class ManageAppComponent implements OnInit {

  appForm!:FormGroup;
  saving:boolean = false;
  savingMessage:string = "";

  appId!:string;
  app!:App;

  constructor(private fb:FormBuilder, private appsDataService:AppsDataService, private router:ActivatedRoute, private navigator:Router, private location:Location) { }

  ngOnInit(): void {
    this.appId = this.router.snapshot.params["appId"];
    
    this.appForm = this.fb.group({
      name: this.fb.control(''),
      initialReleaseDate: this.fb.control(''),
      logo: this.fb.control(''),
      movies: this.fb.group({
        title: this.fb.control(''),
        trailer: this.fb.control('')  
      })
    });
    if(this.appId) { this.getApp(); }
  }

  onAdd():void {
    this.savingMessage = "Saving..."
    this.saving = true;
    this.appForm.value.movies = this.appForm.value.movies || "";
    this.appsDataService.addOneApp(this.appForm.value).subscribe({
      next: (app) => {
        this.app = app;
        this.appId = app._id;
        this.location.replaceState("/apps/manage/"+this.appId);
      },
      error: err => {
        this.saving = false;
        this.savingMessage = "There was problem saving the app"
      },
      complete: () => {
        this.saving = false;
        this.savingMessage = "The application has been saved"
      }
    })
  }

  onUpdate():void {
    this.savingMessage = "Saving..."
    this.saving = true;
    const patchedAppData = {...this.appForm.value, movies:this.app.movies};

    this.appsDataService.updateOneApp(this.appId, patchedAppData).subscribe({
      error: err => {
        this.saving = false;
        this.savingMessage = "There was problem saving the app"
      },
      complete: () => {
        this.saving = false;
        this.savingMessage = "The application has been saved"
      }
    })
  }

  onSave():void {
    this.app ? this.onUpdate() : this.onAdd();
  }
  onDelete():void {
    if(this.appId) {
      this.appsDataService.deleteOneApp(this.appId).subscribe({
        next: app => this.app = app,
        error: err => console.log("Service error", err),
        complete: () => {
          this.navigator.navigate(['/apps']);
        }     
      });
    }
  }

  getApp():void {
    const appId:string = this.router.snapshot.params["appId"];
    this.appsDataService.getOneApp(appId).subscribe({
      next: app => this.app = app,
      error: err => console.log("Service error", err),
      complete: () => {
        console.log("App retrieved");
        this.appForm.patchValue(this.app);
      }     
    });
  }

}
