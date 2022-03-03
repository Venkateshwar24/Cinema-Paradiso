import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'services/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { GenreviewComponent } from './genreview/genreview.component';
import { LoginComponent } from './login/login.component';
import { MovieVerificationComponent } from './movie-verification/movie-verification.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieuploadformComponent } from './movieuploadform/movieuploadform.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/moviesuggestions',
    pathMatch:'full'

  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'moviesuggestions',
    component:MoviesComponent
  },
  {
    path:'uploadcontent',
    component:MovieuploadformComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile',
    component:ProfileViewComponent
  },
  {
    path:'moviesuggestions/:m_id',
    component:MovieViewComponent
  },
  {
    path:'genres/:genre_name',
    component:GenreviewComponent
  },
  {
    path:'database/admin',
    component:AdminPanelComponent
  },
  {
    path:'database/admin/movies/:m_id',
    component:MovieVerificationComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
