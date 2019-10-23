import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (
      user.firstname == undefined ||
      user.firstname == undefined ||
      user.rptpassword == undefined ||
      user.password == undefined ||
      user.username == undefined ||
      user.email == undefined
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  validateInput(input) {
    if (input == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateSkillInput(input) {
    if (input.name == undefined || input.career == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateProfileInput(input) {
    if (input.university == undefined || input.career == undefined) {
      return false;
    }
    else {
      return true;
    }
  }



  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(user) {
    if (user.password !== user.rptpassword) {
      return false;
    }
    else {
      return true;
    }
  }
}
