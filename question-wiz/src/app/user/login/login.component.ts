
//File location in login folder and file name login.component.ts
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
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
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){

    if(this.loginForm.valid){
    //   this.userService.login(this.loginForm.value)
    //   .subscribe((data) => {
    // console.log(data);
    //     if(data.status === 200 && !data.body.ErrorCode){
    //       this.router.navigate(['/homepage']);
    //     }else{
    //       this.loginError = data.body.message;
    //     }
    //   },
    //   error => this.loginError = error
    //   )
    }
    const credentials = {
      'username': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }
    this.userService.login(credentials)
    .subscribe(res => {
      const token = (<any>res).token;
      localStorage.setItem("jwt",token);
      this.invalidLogin = false;
      this.show = 'none'
     // this.router.navigate(['/homepage']);
    }, err => {
      this.invalidLogin = true;
    })

  }

  logOut(){
    localStorage.removeItem("jwt");
  }
}
