import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Property Rental System';
  constructor(public authService: AuthService, private router: Router) {
        // Listen to route changes to dynamically check login status
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            authService.isloggedIn = !!localStorage.getItem('jwt');
          }
        });
   }
  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
          this.router.navigate(['/login']);

    /*
    const isloggedin = localStorage.getItem('isloggedIn');
    const loggedUser = localStorage.getItem('loggedUser');

    if (isloggedin != "true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
*/
  }
  onLogout() {
    this.authService.logout();
  }
}
