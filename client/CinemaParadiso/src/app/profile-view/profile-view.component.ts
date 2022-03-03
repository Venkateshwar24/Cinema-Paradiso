import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'services/auth.service';
import { MoviesService } from 'services/movies.service';
import { mergeMap,map} from 'rxjs/operators';
 
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user;
  userDetails = [];
  uploaded_movies = [];

  constructor(private http: HttpClient,
    private authService: AuthService,
    private movieService: MoviesService) { }

    
  ngOnInit(): void  {

  
    this.profileFetch();
  
  }
  
    
  

   profileFetch() {
    const token =  this.authService.getToken();
     this.http.get(`http://localhost:8000/users/${token}`).toPromise().then(res => this.user = res)
     .then(() =>this.authService.getUserData().toPromise().then(ele => this.userDetails = ele.filter(res=>res._id===this.user._id)))
     .then(() => this.movieService.getMovies().toPromise().then(
       res => this.uploaded_movies = res.filter(ele=> ele.user_id===this.user._id) 
     ));
  }



}
