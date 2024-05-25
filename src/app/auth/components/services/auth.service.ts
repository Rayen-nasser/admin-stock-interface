import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../module/login';
import { environment } from 'src/environments/environment.prod';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlResetPassword: any = environment.baseApi.replace('/auth', '');
  tokenDetails!: String;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd Event:', event);
      }
    });
  }

  login(model: Login) {
    return this.http.post(environment.baseApi + '/login', model);
  }

  forgetPassword(email: string, urlPage: string) {
    return this.http.post(this.urlResetPassword + '/forget-password', {
      email,
      urlPage,
    });
  }

  resetPassword(data: any, password: string) {
    return this.http.post(
      this.urlResetPassword +
        '/reset-password/' +
        data.userId +
        '/' +
        data.token,
      { password }
    );
  }

  validateUserToken(): boolean {
    //@TODO: Valid role admin and use Details from token
    //@TODO: make message clear when if user want to login in app of admin
    const token = localStorage.getItem('token');

    if (token) {
      // Here you can add additional validation logic for the token if needed
      return true; // Return true if the token exists and is valid
    } else {
      return false; // Return false if the token does not exist or is invalid
    }
  }

}
