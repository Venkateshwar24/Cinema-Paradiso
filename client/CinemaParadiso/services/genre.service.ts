import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
private genreurl = "http://localhost:8000/genres";
  constructor( private http:HttpClient) { }


  getGenres()
  {
    return this.http.get<any>(this.genreurl);
  }


}
