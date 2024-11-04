import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  erreur=0;
  user = new User();
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
      this.router.navigate(['/']);
    else
      //alert('Login ou mot de passe incorrecte!');
    this.erreur = 1;
  }
}
