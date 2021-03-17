import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  activeMenu='';
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      let payload = {
        email: user.userName,
        password: user.password
      }
      this.loginService.loginUser(payload).subscribe((userresponse) => {
        this.router.navigate([`login`]);
        if (localStorage.getItem('apiToken') == (undefined || null)) {
          localStorage.setItem('apiToken', userresponse.data.api_token);
        }
        else {
          localStorage.removeItem('apiToken');
          localStorage.setItem('apiToken', userresponse.data.api_token);
        }
        if (localStorage.getItem('userRole') == (undefined || null)) {
          localStorage.setItem('userRole', userresponse.data.user_role);
        }
        else {
          localStorage.removeItem('userRole');
          localStorage.setItem('userRole', userresponse.data.user_role);
        }
        if (localStorage.getItem('userName') == (undefined || null)) {
          localStorage.setItem('userName', userresponse.data.name);
        }
        else {
          localStorage.removeItem('userName');
          localStorage.setItem('userName', userresponse.data.name);
        }
        if (localStorage.getItem('userID') == (undefined || null)) {
          localStorage.setItem('userID', userresponse.data.id);
        }
        else {
          localStorage.removeItem('userID');
          localStorage.setItem('userID', userresponse.data.id);
        }
        this.loggedIn.next(true);
        this.router.navigate(['/tasks']);
      },
        err => {
          if (err.error) {
            alert(err.error.message);
          }
        });
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}

export interface User {
  userName: string;
  password: string;
}