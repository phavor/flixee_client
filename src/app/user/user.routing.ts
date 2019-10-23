import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { ShowMovieComponent } from './components/show-movie/show-movie.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { LoginGuard } from '../guards/login.guard';


const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'movie/:id', component: ShowMovieComponent, canActivate: [AuthGuard] },
      { path: 'search/:text', component: SearchResultComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'favorites', component: FavoriteMoviesComponent, canActivate: [AuthGuard] },

    ]
  }
];

export const UserRouting = RouterModule.forRoot(routes);
