import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movie=[];
private moviesurl = "http://localhost:8000/movies";
  constructor(private http:HttpClient) { }

  getMovies()
  {
    return this.http.get<any>(this.moviesurl);
  }
 getContent()
  {
      this.http.get<any>(this.moviesurl).subscribe(res => this.movie = res);
     return this.movie;
  }
  postMovies(movieData)
  {
    return this.http.post<any>(this.moviesurl,movieData);
  }

  updateMovies(movieData)
  {
    return this.http.put<any>(`${this.moviesurl}/${movieData._id}`,movieData);
  }
  deleteMovies(movie_id)
{
  return this.http.delete(`${this.moviesurl}/${movie_id}`);
}

  postRatings(RatingData,movieid)
  {
    return this.http.post<any>(`http://localhost:8000/ratings/${movieid}`,RatingData);
  }

    getRatings(movieid)
  {
    return this.http.get<any>(`http://localhost:8000/ratings/${movieid}`);
  }

  postReview(ReviewData,movie_id)
  {
    return this.http.post<any>(`http://localhost:8000/reviews/${movie_id}`,ReviewData);
  }
  getReview(movie_id)
  {
    return this.http.get<any>(`http://localhost:8000/reviews/${movie_id}`);
  }
}
