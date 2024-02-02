import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    public bandera=false;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsLoggedIn()) {
      return this.bandera=true;
    } else {
      this.router.navigate(['/login']);
      return this.bandera=false;
    }
  }
}