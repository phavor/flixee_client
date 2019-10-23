import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  name: String;
  username: String;
  type: String;
  email: String;
  password: String;
  rptpassword: String;

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      type: 'Admin',
      username:this.username,
      password:this.password,
      rptpassword: this.rptpassword
    }

    //Reguired Field
  if(!this.validateService.validateRegister(user)){
    this.toastr.error('Error sending form', 'Please fill in all fields', { timeOut: 3000 } );
    return false;
   }

     //Reguired Email
  if(!this.validateService.validateEmail(user.email)){
    console.log('Please use a valid email ');
    this.toastr.error('Error sending form', 'Please use a valid email', { timeOut: 3000 } );
    return false;
   }

     //Reguired Field
  if(!this.validateService.validatePassword(user)){
    console.log('Password not matched');
    this.toastr.error('Error sending form', 'Password not matched', { timeOut: 3000 } );
    
    return false;
   }

   // Register User
   this.auth.registerUser(user).subscribe(data => {
      if(data.success){
        this.toastr.success('Thanks.', 'You have now registered and can login.', { timeOut: 3000 } );
        this.router.navigate(['/admin/login'])
      }
      else{
        this.toastr.error('Try again later. Thanks.','Something went wrong.',  { timeOut: 3000 } );
        this.router.navigate(['/admin/register']);
      }
   })
  }

}
