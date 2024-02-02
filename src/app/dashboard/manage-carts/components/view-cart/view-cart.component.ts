import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CartsService } from '../../service/carts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewCartComponent implements OnInit {
  productsSingleCart!: any[];
  totalPriceInSingleCart: number = 0;
  userData: any;
  accepted: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CartsService,
    public dialog: MatDialogRef<ViewCartComponent>,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.viewAllProductsInCart();
    this.viewDetailsOfUser();
  }

  viewDetailsOfUser() {
    this.service.getUserDetails(this.data.userId).subscribe((res: any) => {
      this.userData = res;
    });
  }

  viewAllProductsInCart() {
    this.productsSingleCart = [];
    for (let product of this.data.products) {
      this.service.getProductById(product.productId).subscribe((res: any) => {
        let data = {
          ...res,
          quantity: product.quantity,
        };
        this.productsSingleCart.push(data);
      });
    }
  }

  acceptOrder(){
    const data = {
      userId:  this.data.userId,
      cartId: this.data.cartId
    }
    this.service.acceptTheOrder(data).subscribe((res: any) => {
      this.toaster.success(res.message)
      this.close()
    })
  }

  close() {
    this.dialog.close();
  }
}
