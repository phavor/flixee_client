import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../../services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  email: String;
  password: String;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    
    const user = {
      email: this.email,
      password: this.password
    };
    
    this.auth.authenticateUser(user).subscribe( data => {
      if(data.success){
        var use = localStorage.getItem('user')
        console.log(use)
        
        console.log(this.jwtHelper.isTokenExpired());
        this.auth.storeUserData(data.token, data.user);
        this.toastr.success( data.msg,'You are now logged in.',  { timeOut: 5000 } );
        this.router.navigate(['/user']);
      }
      else{
        this.toastr.error( data.msg,'Invalid login details.',  { timeOut: 5000 } );
        this.router.navigate(['/user/login']);
      }
    })
  }

}
