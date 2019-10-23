import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any[] = [];

  user: any = {};

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.allMovies();
    },
      err => {
        console.log(err);
        return false;
      });
  }

  allMovies() {
    this.userService.getMovies().subscribe((data: any) => {
      if (data.success) {
        this.movies = data.movie;

      }
      else {
        console.log('Something went wrong');
      }

    });
  }

  favorite(id) {
    let fav = this.user.favorites;
    return (fav.indexOf(id) > -1);
  }

  addFavorite(movieId) {

    const favourite = {
      favorite: movieId
    }
    this.userService.addFavourite(this.user._id, favourite).subscribe((data: any) => {
      if (data.success) {
        this.allMovies();
        this.ngOnInit();
      }
      else {
        console.log('Something went wrong');
      }

    });
  }

  removeFavorite(movieId) {

    const favourite = {
      favorite: movieId
    }
    this.userService.removeFavourite(this.user._id, favourite).subscribe((data: any) => {
      if (data.success) {
        this.ngOnInit();

      }
      else {
        console.log('Something went wrong');
      }

    });
  }

}
