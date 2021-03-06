import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NavComponent } from './nav/nav.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './token-interceptor.service';
import { MessageAlertComponent } from './message-alert/message-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    DDDAppComponent,
    DDDAppsComponent,
    MovieComponent,
    SearchComponent,
    PageNotFoundComponent,
    ManageAppComponent,
    FooterComponent,
    LoginComponent,
    RegisterUserComponent,
    NavComponent,
    MessageAlertComponent
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
      {path:"login", component: LoginComponent},
      {path:"register", component: RegisterUserComponent},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
