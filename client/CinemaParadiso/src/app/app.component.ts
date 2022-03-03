import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { GenreService } from 'services/genre.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CinemaParadiso';
  genres = [];
  showFiller = false;
  gen;
  public isMenuCollapsed = true;
  constructor(public authService: AuthService,
    private genreService: GenreService,
    private _route : Router) { }

    
  ngOnInit() {
    this.fetchGenres();
  }

  fetchGenres() {
    this.genreService.getGenres()
      .subscribe(
        res => this.genres = res,
        err => console.log(err)
      );
  }

  gens(event)
  {
    //if(event!=='Genres')
    this.gen = event;
  }
 isRouteValid()
 {
   return this._route.url === `/genres/${this.gen}`;
 }
}
