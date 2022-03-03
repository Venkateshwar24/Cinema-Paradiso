import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { MoviesService } from '../../../services/movies.service';
import { FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit,  AfterContentInit {

  movies = [];
  user: Object;
  movieData: any;
  reviews = [];
  movieIdfromRoute: string;
  constructor(private route: ActivatedRoute,
    private movieService: MoviesService,
    public authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private _route: Router) { }


  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.movieIdfromRoute = routeParams.get('m_id');
    this.movieService.getMovies().toPromise().then(res => this.movies = res)
    .then( movies => this.movieData = movies.filter(mov => mov._id === this.movieIdfromRoute));
    

  }
  ngAfterContentInit() {
    if (this.authService.isLoggedIn()) {
      this.getUserId();
    }
    this.getReviews();
  
  }
  getUserId() {
    const token = this.authService.getToken();
    this.http.get(`http://localhost:8000/users/${token}`)
      .subscribe(
        res => this.user = res);


  }


  ReviewData = this.fb.group({
    user_id: [''],
    user_name:[''],
    movie_id: [''],
    user_reviewHeader: [''],
    user_review: ['']
  })

  onReviewSubmit(user_id: any, user_name:any, movie_id: any) {
    this.ReviewData.get('user_id').setValue(user_id);
    this.ReviewData.get('user_name').setValue(user_name);
    this.ReviewData.get('movie_id').setValue(movie_id);
    this.movieService.postReview(this.ReviewData.value, movie_id)
      .subscribe(res => {
        console.log(res)
        alert("Review Successful")
      },
        err => console.log(err)
      );
    window.location.reload();
    this._route.navigate([`/moviesuggestions/${this.movieIdfromRoute}`]);
  }

  getReviews() {
    this.movieService.getReview(this.movieIdfromRoute)
      .subscribe(
        res => this.reviews = res,
        err => console.log(err)
      );

  }

}
