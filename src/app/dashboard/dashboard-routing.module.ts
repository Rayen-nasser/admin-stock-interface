import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import(`./recent-sales/recent-sales.module`).then(
            (m) => m.RecentSalesModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import(`./manage-products/manage-products.module`).then(
            (m) => m.ManageProductsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import(`./manage-users/manage-users.module`).then(
            (m) => m.ManageUsersModule
          ),
      },
      {
        path: 'carts',
        loadChildren: () =>
          import(`./manage-carts/manage-carts.module`).then(
            (m) => m.ManageCartsModule
          ),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import(`./manage-messages/manage-messages.module`).then(
            (m) => m.ManageMessagesModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
