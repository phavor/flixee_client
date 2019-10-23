import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const mode = process.env.NODE_ENV === 'production'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url = "http://localhost:8080";
  url = mode ? "https://flixie.herokuapp.com" : "http://localhost:8000"

  constructor(private http: HttpClient, ) { }

  getMovies() {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/users/movie/all", options)
  }

  getAMovie(id) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/users/movie/" + id, options)
  }

  addFavourite(id, favorite: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/" + id + "/movie/favorite/add", JSON.stringify(favorite), options)
  }

  removeFavourite(id, favorite: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/" + id + "/movie/favorite/remove", JSON.stringify(favorite), options)
  }

  favoriteMovies(favorite) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/movie/favorite/all", JSON.stringify(favorite), options)
  }

  searchMovies(word) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/search", JSON.stringify(word), options)
  }
}
