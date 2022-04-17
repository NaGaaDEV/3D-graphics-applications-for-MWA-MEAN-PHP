import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DDDAppsComponent } from './3d-apps/ddd-apps.component';
import { DDDAppComponent } from './3d-app/ddd-app.component';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageAppComponent } from './manage-app/manage-app.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DDDAppComponent,
    DDDAppsComponent,
    MovieComponent,
    SearchComponent,
    PageNotFoundComponent,
    ManageAppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "", redirectTo: '/apps', pathMatch: 'full'},
      {path:"apps", component: DDDAppsComponent},
      {path:"apps/manage", component: ManageAppComponent},
      {path:"apps/manage/:appId", component: ManageAppComponent},
      {path:"apps/:appId", component: DDDAppComponent},
      {path:"apps/:appId/movies/:movieId", component: MovieComponent},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
