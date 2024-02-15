import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CartsService } from '../../service/carts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as L from 'leaflet';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewCartComponent implements OnInit {
  productsCart!: any[];
  returnedProducts: { productId: string; newQte: number; returnQte: number }[] = [];
  cart: any;
  btn!: string;
  userDetail: any;
  address!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CartsService,
    public dialog: MatDialogRef<ViewCartComponent>,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.viewDetailsCart();
  }

  viewDetailsCart() {
    this.service.getCartDetails(this.data.cartId).subscribe((res: any) => {
      this.extractProductsFromCart(res.products);
      this.extractAddress(res.address);
      this.userDetail = res.userId;
      this.btn = res.sale;
    });
  }

  extractProductsFromCart(cartDetails: any) {
    this.productsCart = cartDetails.map((item: any) => {
      return {
        _id: item.productId._id,
        marque: item.productId.marque,
        price: item.productId.price,
        image: item.productId.imageUrl,
        quantity: item.quantity,
        originQte: item.quantity,
        return: false,
      };
    });
  }

  extractAddress(cartDetails: any) {
    const { country, city, postcode, formatted } = cartDetails.properties;
    this.address = { country, city, postcode, formatted };
  }

  acceptOrder() {
    const data = {
      userId: this.data.userId,
      cartId: this.data.cartId,
    };
    this.service.acceptTheOrder(data).subscribe((res: any) => {
      this.toaster.success(res.message);
      this.close();
    });
  }

  delivered() {
    this.service.deliveredOrder(this.data.cartId).subscribe((res: any) => {
      this.toaster.success(res.message);
      this.close();
    });
  }

  increaseQuantity(index: number) {
    if (
      this.productsCart[index].quantity < this.productsCart[index].originQte
    ) {
      this.productsCart[index].quantity++;
      this.returnedProducts[index].returnQte--;
    this.returnedProducts[index].newQte++;
    }
  }

  decreaseQuantity(index: any) {
    this.productsCart[index].quantity--;
    this.returnedProducts[index].returnQte++;
    this.returnedProducts[index].newQte--;
    // if (this.productsCart[index].quantity > 0) {
    //   const updatedCart = [
    //     ...this.productsCart.slice(0, index),
    //     ...this.productsCart.slice(index + 1)
    //   ];

    //   this.productsCart = updatedCart;
    // }
  }

  addToReturned(index: number,id: string, newQte: number, origin: number) {
    this.productsCart[index].return = !this.productsCart[index].return
    this.returnedProducts.push({
      productId: id,
      newQte,
      returnQte: origin - newQte,
    });

  }

  returnCart() {
    if (this.returnedProducts.length !== 0) {
      this.service
        .returnOrder(this.data.cartId, this.returnedProducts)
        .subscribe((res: any) => {
          this.toaster.warning(res.message);
          this.ngOnInit();
          this.close();
        });
    }
  }

  close() {
    this.dialog.close();
  }
}
