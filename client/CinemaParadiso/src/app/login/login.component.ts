import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginUserData = {
  email_id : '',
  user_password : ''
}
  constructor( private authService:AuthService,
               private _router : Router,
               private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onLogin()
  {
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res=> {
        localStorage.setItem('token',res.token)
        this._router.navigate(['/moviesuggestions']);
      },
      err=>this._snackBar.open(`Invalid Credentials`, 'Ok')
    );
  }


}
