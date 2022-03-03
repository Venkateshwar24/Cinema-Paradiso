import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { GenreService } from '../../../services/genre.service';
import { MoviesService } from '../../../services/movies.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Languages } from 'Shared/languages';
import { Countries } from 'Shared/countries';
@Component({
  selector: 'app-movieuploadform',
  templateUrl: './movieuploadform.component.html',
  styleUrls: ['./movieuploadform.component.css']
})
export class MovieuploadformComponent implements OnInit {
  newMovieData: FormGroup;
 user_id;
 user;
 username;
regioon="";
 languages=Languages;
  countries = Countries;
  countryy;
  genres = [];
  genreSelection =[];
  constructor(private locationService: LocationService,
              private genreService: GenreService,
              private movieService: MoviesService,
              private fb: FormBuilder,
              private authService :AuthService,
              private http : HttpClient,
              private _route : Router
              )
  {
    this.newMovieData = this.fb.group({
      movie_title: [''],
      release_year: [''],
      movie_desc: [''],
      running_min: [''],
      movie_director: [''],
      streaming_platform: [''],
      movie_country: [''],
      movie_region: [''] ,
      movie_language: [''],
      movie_poster: ['',[Validators.required]],
      wikipedia_url: [''],
      genres_list: [''] 
    });
  }

  ngOnInit(): void {
 
    this.getUserId();
    
   


    // To get the genres data

    this.genreService.getGenres()
      .subscribe(
        res => this.genres = res,
        err => console.log(err)
      );
    

  }
  onFileChange(event:any) {
    
    if(event.target.files && event.target.files[0])
    {
      const reader = new FileReader();
      reader.onload = () => {
        this.newMovieData.get('movie_poster').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  checked(genre)
  {
   if(this.genreSelection.indexOf(genre)!=-1)
   {
     return true;
   }
  }

  onChangeSelection(checked,genre)
  {
    if(checked)
    {
      this.genreSelection.push(genre);
    }
    else
    {
      this.genreSelection.splice(this.genreSelection.indexOf(genre),1);
    }

  }









  onMovieSubmit() {
    const formData = new FormData();
    formData.append('movie_title','venkateshwar');
    formData.append('release_year',this.newMovieData.get('release_year').value);
    formData.append('movie_desc',this.newMovieData.get('movie_desc').value);
    formData.append('running_min',this.newMovieData.get('running_min').value);
    formData.append('movie_director',this.newMovieData.get('movie_director').value);
    this.user_id = this.user._id;
    this.username = this.user.user_name;
    formData.append('user_id',this.user_id);
    formData.append('user_name',this.user.user_name);
    formData.append('streaming_platform',this.newMovieData.get('streaming_platform').value);
    formData.append('movie_country',this.newMovieData.get('movie_country').value);
    formData.append('movie_region',this.newMovieData.get('movie_region').value);
    formData.append('movie_language',this.newMovieData.get('movie_language').value);
    formData.append('movie_poster',this.newMovieData.get('movie_poster').value);
    formData.append('wikipedia_url',this.newMovieData.get('wikipedia_url').value);
    for(let i=0; i<this.genreSelection.length; i++)
    {
      formData.append('genres_list[]',this.genreSelection[i]);
    }
    

   
    
       
     
    
    
    this.movieService.postMovies(formData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
      this._route.navigate(['/']);
  }

 getUserId()
    {
      const token = this.authService.getToken();
      this.http.get(`http://localhost:8000/users/${token}`)
      .subscribe(
        res => this.user = res);
    }
    

 assignRegion(eve)
 {
   this.regioon=eve; 
 }


}
