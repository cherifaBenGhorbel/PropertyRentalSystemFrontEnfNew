import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  user = new User();
  err: number = 0;
  mess:string="Login or Password incorrect...";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isloggedIn) {
      //redirect to home if already logged in
      this.router.navigate(['/']); 
    }
  }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
        console.log(this.authService.isloggedIn);
      },
      error: (err: any) => {
        this.err = 1;
        if (err.error.errorCause == "disabled") {
          this.mess = "Your account is disabled !!!";
        }
        
        

      }
    });

  }
}
