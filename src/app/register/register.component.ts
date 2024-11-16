import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from './../model/user.model';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword!: string;
  myForm!: FormGroup;
  loading : boolean = false;
  err!: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router , private toastr: ToastrService,  private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
     this.toastr.success('Test message', 'Test Title');
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator]],
    });
  }

  matchPasswordValidator(control: any) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
  }

  onRegister() {
    console.log(this.user);
    this.loading=true;
    if (this.myForm.valid) {
      this.authService.registerUser(this.user).subscribe({
        next: (res) => {
          this.authService.setRegistredUser(this.user);
          this.toastr.success('Please confirm your email','Confirmation Email Sent');
          this.loading=false;
          this.router.navigate(['/verifEmail']);
          this.cdRef.detectChanges();
        },
        error: (err: any) => {
          if(err.error.errorCode=="USER_EMAIL_ALREADY_EXISTS"){
            this.err = "Email already exists";
          } 
            
        }
      });
    }
  }
}