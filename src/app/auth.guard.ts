import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // if token exists in localStorage 
    if (localStorage.getItem('jwt')) {
      // If user is logged in redirect to the home 
      this.router.navigate(['/']); 
      return false;  // Prevent access to the login route
    }
    // Allow access to the login route if not logged in
    return true;
  }
}
