import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ManageProductsRoutingModule } from './manage-products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddProductComponent,
    ConfirmationComponent,
    ListProductsComponent
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
export class ManageProductsModule { }
