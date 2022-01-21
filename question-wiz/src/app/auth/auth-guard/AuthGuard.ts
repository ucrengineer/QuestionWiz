import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private jwtHelper:JwtHelperService){

  }
  // canActivate()
  // {

  //   const token = localStorage.getItem("jwt");
  //   if(token && !this.jwtHelper.isTokenExpired(token)){
  //     alert('tre')
  //     return true;
  //   }
  //   this.router.navigate['/register']
  //   alert('go to login')
  //   return false;

  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        const token = localStorage.getItem("jwt");
        if(token && !this.jwtHelper.isTokenExpired(token)){
          return true;
        }

        return this.router.createUrlTree(['/login']);

        }



}
