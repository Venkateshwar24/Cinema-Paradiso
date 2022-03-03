import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'services/movies.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  movies = [];

  constructor( private movieService : MoviesService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies()
  {
    this.movieService.getMovies().subscribe(res => this.movies = res.filter(item => item.isVerified===false),
      err => console.log(err));
  }
}
