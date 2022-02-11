import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {
  isLoginMode: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    if(this.isLoginMode) {

    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }

    authForm.reset();
  }
}
