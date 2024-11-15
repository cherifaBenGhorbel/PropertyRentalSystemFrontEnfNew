import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { apiURLUser } from '../config';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*users: User[] = [
    { "username": "admin", "password": "123", "roles": ['ADMIN'] },
    { "username": "cherifa", "password": "123", "roles": ['USER'] }
  ];*/

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  token!: string;

  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(apiURLUser + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    if (typeof window !== 'undefined' && window.localStorage) { // Check if window and localStorage are available
      localStorage.setItem('jwt', jwt);
    }
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    if (decodedToken && decodedToken.roles) {
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
    }
  }
  

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  loadToken() {
    if (typeof window !== 'undefined' && window.localStorage) { // Check if window and localStorage are available
      this.token = localStorage.getItem('jwt') || "";
    }
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }


  /* SignIn(user: User): Boolean {
     let validUser: Boolean = false;
 
     this.users.forEach((curUser) => {
       if (user.username == curUser.username && user.password == curUser.password) {
         validUser = true;
         this.loggedUser = curUser.username;
         this.isloggedIn = true;
         this.roles = curUser.roles;
         localStorage.setItem('loggedUser', this.loggedUser);
         localStorage.setItem('isloggedIn', String(this.isloggedIn));
       }
     });
     return validUser;
   }*/

  isAdmin(): Boolean {
    if (!this.roles) //this.roles == undefiened
      return false;
    return (this.roles.indexOf('ADMIN') >= 0);
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
  setLoggedUserFromLocalStorage(username: string) {
    this.loggedUser = username;
    this.isloggedIn = true;
    // this.getUserRoles(username);
  }
  /* getUserRoles(username :string){
     this.users.forEach((curUser) => {
     if( curUser.username == username ) {
     this.roles = curUser.roles;
     }
     });}*/

     registerUser(user :User){
      return this.http.post<User>(apiURLUser + '/register', user, { observe: 'response' });
      }


}
