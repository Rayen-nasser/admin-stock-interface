import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/components/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) {
      // If the user is authenticated, prevent access to the login page
      this.router.navigate(['/dashboard']); // Redirect to the dashboard or another page
      return false;
    } else {
      // If the user is not authenticated, allow access to the login page
      return true;
    }
  }
}
