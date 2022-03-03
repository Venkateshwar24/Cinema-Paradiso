import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MovieuploadformComponent } from './movieuploadform/movieuploadform.component';
import { AuthService } from 'services/auth.service';
import { GenreService } from 'services/genre.service';
import { AuthGuard } from 'services/auth.guard';
import { TokenInterceptorService } from 'services/token-interceptor.service';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { GenreviewComponent } from './genreview/genreview.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { RatingComponent } from './rating/rating.component';
import { ReviewsComponent } from './reviews/reviews.component'
import { NgpSortModule } from "ngp-sort-pipe";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CarousalComponent } from './carousal/carousal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MovieVerificationComponent } from './movie-verification/movie-verification.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MoviesComponent,
    MovieuploadformComponent,
    ProfileViewComponent,
    MovieViewComponent,
    GenreviewComponent,
    MovieCardComponent,
    RatingComponent,
    ReviewsComponent,
    CarousalComponent,
    AdminPanelComponent,
    MovieVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatMenuModule,
    NgpSortModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule

  ],
  providers: [AuthService,GenreService,AuthGuard,TokenInterceptorService,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
