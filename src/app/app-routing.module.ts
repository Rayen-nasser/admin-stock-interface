import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { ForgetPasswordComponent } from './auth/components/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule),
  },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "forget-password/:userId/:token", component: ForgetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
