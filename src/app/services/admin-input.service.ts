import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
const mode = process.env.NODE_ENV === 'production'

@Injectable({
  providedIn: "root"
})
export class AdminInputService {
  input: any;
  url = mode ? "https://flixie.herokuapp.com" : "http://localhost:8000"

  constructor(private http: HttpClient,
    private Http: Http) { }

  addMovie(input) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/admin/movie/add", JSON.stringify(input), options)
  }

  getMovies() {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/admin/movie/all", options)
  }

  getAMovie(id) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/admin/movie/" + id, options)
  }

  updateMovie(movie: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .put(
        this.url + "/api/admin/update/movie/" + movie._id,
        JSON.stringify(movie),
        options
      )
  }

  deleteMovie(id: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .delete(this.url + "/api/admin/delete/movie/" + id, options)
  }

  public movieImage(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/api/admin/movie/upload/' + id, formData)
  }
}
