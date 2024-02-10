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
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
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
}
