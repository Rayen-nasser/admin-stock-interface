import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './components/carts/carts.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ManageProductsRoutingModule } from './manage-carts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCartComponent } from './components/view-cart/view-cart.component';



@NgModule({
  declarations: [
    CartsComponent,
    ViewCartComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ManageProductsRoutingModule
  ]
})
export class ManageCartsModule { }
