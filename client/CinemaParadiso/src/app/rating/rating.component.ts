import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { MoviesService } from 'services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
@Input() movieData;

stars: number[] = [1, 2, 3, 4, 5];
selectedValue: number;
user;
rating: any;
modalContent: undefined;

  constructor(private movieService : MoviesService,
              private authService : AuthService,
              private _route : Router,
              private modalService: NgbModal,
              private fb : FormBuilder,
              private http : HttpClient,
              private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserId();
    }
  }
  
  RatingData = this.fb.group({
    user_id: [''],
    movie_id: [''],
    user_rating: ['']
  });

  countStar(star) {
    this.selectedValue = star;
    this.rating = star;
  }


  getUserId() {
    const token = this.authService.getToken();
    this.http.get(`http://localhost:8000/users/${token}`)
      .subscribe(
        res => this.user = res);
  }
  onSubmitRating(movieid) {

    if (this.rating) {
      this.RatingData.get('user_id').setValue(this.user._id);
      this.RatingData.get('movie_id').setValue(movieid);
      this.RatingData.get('user_rating').setValue(this.rating);


      this.movieService.postRatings(this.RatingData.value, movieid)
        .subscribe(res => {
          console.log(res)
         
        },
          err => console.log(err));
          //this._route.navigate(['/moviesuggestions']);
          this._snackBar.open('Rating Successful', 'Ok');
          window.location.reload();
      

    }
    else {
      alert('Please rate to complete the rating');
    }
  }


  open(content, movie) {
    if (!this.authService.isLoggedIn()) {
      this._snackBar.open('Please login to rate', 'ok');
      
      this._route.navigate(['/login']);
    }
    else {
      let RatingApi = [];
      this.movieService.getRatings(movie._id).toPromise().then(res => RatingApi = res)
        .then(RatingApi => {
          if (RatingApi.find(users => this.user._id === users.user_id)) {
            
              this._snackBar.open('Already Rated', 'Ok');
            
          }
          else {

            this.modalContent = movie;
            this.modalService.open(content, { centered: true });
          }
        }
        )

    }

  }
}
