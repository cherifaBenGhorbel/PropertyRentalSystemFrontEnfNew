import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
})
export class VerifEmailComponent implements OnInit {
  code: string = "";
  err = "";
  user: User = new User();

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getRegistredUser();
  }

  onValidateEmail(): void {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        this.authService.login(this.user).subscribe({
          next: (data) => {
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
           
            console.error(err);
          }
        });
        alert("Email validated successfully");
      },
      error: (err: any) => {
        console.error(err);
        if (err.error.errorCode == "INVALID_TOKEN") {
          this.err = "Your code is invalide !!";
        }
        if (err.error.errorCode == "EXPIRED_TOKEN") {
          this.err = "Your code is expired !!";
        }
      }
    });
  }
}