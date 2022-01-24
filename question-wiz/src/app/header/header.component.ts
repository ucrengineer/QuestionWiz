import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active = true; loggedIn: boolean = false;
  constructor(private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {


  }

  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
  }


}
