import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: String;
  rptpassword: String;

  showWait: boolean = false;

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password,
      rptpassword: this.rptpassword
    }

    //Reguired Field
    if (!this.validateService.validateRegister(user)) {
      this.toastr.error('Error sending form', 'Please fill in all fields', { timeOut: 3000 });
      return false;
    }

    //Reguired Email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email ');
      this.toastr.error('Error sending form', 'Please use a valid email', { timeOut: 3000 });
      return false;
    }

    //Reguired Field
    if (!this.validateService.validatePassword(user)) {
      console.log('Password not matched');
      this.toastr.error('Error sending form', 'Password not matched', { timeOut: 3000 });
      return false;
    }

    this.showWait = true

    // Register User
    console.log("i was clicked")
    this.auth.registerUser(user).subscribe(data => {
      if (data.success) {
        this.toastr.success('Thanks.', 'You have now registered and can login.', { timeOut: 3000 });
        this.showWait = false
        this.router.navigate(['/user/login'])
      }
      else {
        this.toastr.error('Please Try again. Thanks.', 'Something went wrong. Email already exist', { timeOut: 3000 });
        this.router.navigate(['/user/Register']);
      }
    })
  }





}
