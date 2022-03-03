import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'services/movies.service';

@Component({
  selector: 'app-movie-verification',
  templateUrl: './movie-verification.component.html',
  styleUrls: ['./movie-verification.component.css']
})
export class MovieVerificationComponent implements OnInit {
movies=[];
movieIdfromRoute;
movieData;
  constructor(private route : ActivatedRoute,
    private movieService : MoviesService,
    private _route : Router,
    private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.movieIdfromRoute = routeParams.get('m_id');
    this.movieService.getMovies().toPromise().then(res => this.movies = res)
    .then( movies => this.movieData = movies.filter(mov => mov._id === this.movieIdfromRoute));
  }


onApproval(movie)
{
  movie.isVerified=true;
  this.movieService.updateMovies(movie).subscribe(res => console.log("Approved"), err=>console.log(err) );
  this._snackBar.open('Approved Successfully', 'Ok');
  this._route.navigate(['/database/admin']);
}

onDenial(movie)
{
  this.movieService.deleteMovies(movie._id)
  .subscribe(
    res => console.log(res),
    err => console.log(err)
  );
  this._snackBar.open('Deleted Successfully', 'Ok');
  this._route.navigate(['/database/admin']);
}

}
