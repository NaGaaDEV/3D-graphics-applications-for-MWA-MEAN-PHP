import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DDDAppsComponent } from './3d-apps/ddd-apps.component';
import { DDDAppComponent } from './3d-app/ddd-app.component';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    DDDAppComponent,
    DDDAppsComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"", component: DDDAppsComponent},
      {path:"apps/:appId", component: DDDAppComponent},
      {path:"apps/:appId/movies/:movieId", component: MovieComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
