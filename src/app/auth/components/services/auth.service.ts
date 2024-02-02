import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../module/login';
import { environment } from 'src/environments/environment.prod';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd Event:', event);
      }
    });
   }

  login(model:Login){
    return this.http.post( environment.baseApi + "/login", model)
  }
  isAuthenticated(): boolean {
    // Check if a token exists in localStorage
    return !!localStorage.getItem('token');
  }
}
