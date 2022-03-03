import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users;
  private signupurl = 'http://localhost:8000/users';
  private loginurl = 'http://localhost:8000/users/login';
  constructor( private http:HttpClient,
              private router:Router) { }

  signupUser(user)
  {
     return this.http.post<any>(this.signupurl,user);
  }

  loginUser(user)
  {
    return this.http.post<any>(this.loginurl,user);
  }
  
  isLoggedIn()
  {
    return !!localStorage.getItem('token');
  }

  logoutUser()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/moviesuggestions']);

  }


  getToken()
  {
    return localStorage.getItem('token');
  }
  getUserData()
  {
    return this.http.get<any>(this.signupurl);
  }
  getUser(user_id)
  {
    return this.http.get<any>(`http://localhost:8000/users/details/${user_id}`);
  }

}
