import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
  {path:'',
  loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule),
  // canActivate: [AdminGuard]
  },
  {path:'login',
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule),
  canActivate: [NoAuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
