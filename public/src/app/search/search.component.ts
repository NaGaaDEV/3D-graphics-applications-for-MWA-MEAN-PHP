import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { App } from '../app.model';
import { AppsDataService } from '../apps-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult!:App[];

  constructor(private appsDataService:AppsDataService) { }

  ngOnInit(): void {
  }

  searchApp(searchForm:NgForm): void {
    this.appsDataService.searchAppByName(searchForm.value).subscribe({
      next: apps => this.searchResult = apps,
      error: err => console.log("Service error", err),
      complete: () => console.log("Search completed")
      
    });
  }

}
