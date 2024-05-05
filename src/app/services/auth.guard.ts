

import { Injectable } from '@angular/core';
import { AuthService } from './login.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
    public bandera=false;
    public mensaje!:any;
  constructor(private authService: AuthService) {
  }

  isLogin(): Boolean {
    this.authService.getIsLoggedIn().subscribe(
      result => {
        let mensaje=result
        this.bandera=mensaje.login;
        console.log(mensaje.login)
        return this.bandera;
      },
      error => {
        console.log(error)
        return this.bandera=false;
        
      })
      return this.bandera;  
  }
}
/*
export class AuthGuard implements Resolve<boolean> {
  public bandera=false;
  constructor(private authService: AuthService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    this.authService.getIsLoggedIn().subscribe(
      result => {
        let mensaje=result
        this.bandera=mensaje.login;
        return this.bandera;
      },
      error => {
        console.log(error)
      })
      return this.bandera;
  }*/

