import { Component, OnInit,OnChanges,Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'services/movies.service';

@Component({
  selector: 'app-genreview',
  templateUrl: './genreview.component.html',
  styleUrls: ['./genreview.component.css']
})
export class GenreviewComponent implements OnChanges,OnInit {
movies=[];
moviesData=[];
@Input() Genre;
genreNamefromRoute;
  constructor(private route : ActivatedRoute,
              private movieService : MoviesService) { }


              

  ngOnChanges(changes:SimpleChanges) {
    this.genreFilter();
    console.log(changes);
    
  }
  ngOnInit(){
    this.genreFilter();
  }

  genreFilter()
  {
    this.movieService.getMovies().toPromise().then(res => this.movies = res)
    .then(movies => this.moviesData = this.movies.filter(movie => movie.genres_list.find(item => item=== this.Genre)));
  }

}
