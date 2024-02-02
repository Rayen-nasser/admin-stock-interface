import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../service/products.service';
import { UsersService } from 'src/app/dashboard/manage-users/service/users.service';
import { CartsService } from 'src/app/dashboard/manage-carts/service/carts.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private dialog: MatDialogRef<ConfirmationComponent>,
    private matDialog: MatDialog,
    private productService: ProductsService,
    private userService: UsersService,
    private cartService: CartsService
  ) {}

  ngOnInit(): void {}

  confirmDelete() {
    if (this.data.type == 'user') {
      this.userService.delete(this.data.id).subscribe((res: any) => {
        this.toaster.success(res.message);
        this.dialog.close(true);
      });
    } else if (this.data.type == 'cart') {
      this.cartService.deleteCart(this.data.id).subscribe((res: any) => {
        this.toaster.success(res.message);
        this.dialog.close(true);
      });
    } else {
      this.productService.deleteProduct(this.data.id).subscribe((res: any) => {
        this.toaster.success(res.message);
        this.dialog.close(true);
      });
    }
  }

  closeOnlyDialogConfirm() {
    this.dialog.close();
  }

  closeAll() {
    this.matDialog.closeAll();
  }
}
