import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';

import { AuthService } from 'services/auth.service';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies = [];

  
  user;
 
  username;
  constructor(private movieService: MoviesService,
    
    private authService: AuthService,
    private http: HttpClient,
    
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this.fetchMovies();


    if (this.authService.isLoggedIn()) {
      this.getUserId();
    }

  }


  fetchMovies() {
    this.movieService.getMovies()
      .subscribe(
        res => this.movies = res.sort((a,b)=> {
          return b.avg_rating - a.avg_rating;
        }),
        err => console.log(err)
      );
  }





 

  getUserId() {
    const token = this.authService.getToken();
    this.http.get(`http://localhost:8000/users/${token}`)
      .subscribe(
        res => this.user = res);
  }

  

  


 
}

