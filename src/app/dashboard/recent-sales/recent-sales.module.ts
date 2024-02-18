import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './components/sales/sales.component';
import { TopSelingComponent } from './components/top-seling/top-seling.component';
import { RecentSalesRoutingModule } from './recent-sales-routing.module';
import { FinishedProductsComponent } from './components/finished-products/finished-products.component';



@NgModule({
  declarations: [
    SalesComponent,
    TopSelingComponent,
    FinishedProductsComponent
  ],
  imports: [
    CommonModule,
    RecentSalesRoutingModule
  ]
})
export class RecentSalesModule { }
