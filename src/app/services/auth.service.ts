import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
const mode = process.env.NODE_ENV === 'production'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any
  usertype: any;
  isAdmin: any;

  url = mode ? "https://flixie.herokuapp.com" : "http://localhost:8000"

  constructor(private http: Http, private jwtHelper: JwtHelperService) { }

  registerUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/api/users/register', JSON.stringify(user), options).pipe(
      map((response: Response) => response.json()));
  }


  authenticateUser(user) {
    // console.log(localStorage.getItem('user'));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/api/users/authenticate', JSON.stringify(user), options).pipe(
      map((response: Response) => response.json()));
  }

  authenticateAdmin(user) {
    // console.log(localStorage.getItem('user'));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/api/admin/authenticate', JSON.stringify(user), options).pipe(
      map((response: Response) => response.json()));
  }

  addProfile(user: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/api/users/profiles/' + user._id, JSON.stringify(user), options).pipe(
      map((response: Response) => response.json()));
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token
  }

  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  userType() {
    return !!localStorage.getItem('admin');
  }

  getProfile() {
    this.loadToken()
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/api/users/profile', options).pipe(
      map((response: Response) => response.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  storeAdminData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('admin', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.usertype = null;
    localStorage.clear();
  }

  ngOnInit() {
    const token: string = localStorage.getItem('token');
    this.jwtHelper.isTokenExpired(token);
  }
}
