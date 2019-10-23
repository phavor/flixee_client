import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email: String;
  password: String;
  userType: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService) { }

  ngOnInit() {
  }

  onLoginSubmit() {

    const user = {
      email: this.email,
      password: this.password
    };

    this.auth.authenticateAdmin(user).subscribe(data => {
      this.userType = data
      if (data.success) {
        if (data.success) {
          console.log(this.jwtHelper.isTokenExpired());
          this.auth.storeAdminData(data.token, data.user);
          this.toastr.success(data.msg, 'You are now logged in.', { timeOut: 5000 });
          this.router.navigate(['/admin']);
          return true;
        }

        else {
          this.toastr.error(data.msg, 'You are not authorized as an admin.', { timeOut: 5000 });
          this.router.navigate(['/admin/login']);
        }
      }


      else {
        this.toastr.error(data.msg, 'Invalid login details.', { timeOut: 5000 });
        this.router.navigate(['/admin/login']);
      }
    })
  }

}







