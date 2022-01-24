
//File location in login folder and file name login.component.ts
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { AuthService } from 'src/app/auth/auth-service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../user/userFormStyle.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  show : string = 'block'
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,])
  })



  public loginError:String;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){

    if(this.loginForm.valid){
    }
    // replace with user object
    const credentials = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }

    this.authService.login(credentials)
    .subscribe(res => {
      console.log(res)
      const token = (<any>res).token;
      const email = (<any>res).email;
      localStorage.setItem("jwt",token);
      localStorage.setItem("email",email);
      this.invalidLogin = false;
      this.show = 'none'
      this.router.navigate(['/homepage']);
    }, err => {
      this.invalidLogin = true;
    })

  }

  logOut(){
    localStorage.removeItem("jwt");

  }
}
