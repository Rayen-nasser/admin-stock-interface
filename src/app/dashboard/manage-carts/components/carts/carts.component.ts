import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CartsService } from '../../service/carts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/dashboard/manage-products/components/confirmation/confirmation.component';
import { ViewCartComponent } from '../view-cart/view-cart.component';
import {
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { SharedService } from 'src/app/dashboard/services/shared.service';
import * as numeral from 'numeral';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  displayedColumns: string[] = [
    'code',
    'status',
    'date',
    'amountTotal',
    'view',
    'delete',
  ];
  numeral = numeral;

  page: number = 1;
  total: number = 0;
  filtration: any = {
    page: this.page,
    limit: 4,
  };
  pageSizeOptions!: any;
  dataSource: any;

  optionData$!: Observable<string>;
  searchData$!: Observable<string>;

  constructor(
    private cartsService: CartsService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {
    this.getAllCarts();
  }

  ngOnInit(): void {
    combineLatest([
      this.sharedService.getOptionData('cart'),
    ])
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(([ optionData]) => {
          this.page = 1;
          this.filtration['page'] = 1;
          this.setCartFilter(optionData);
        })
      )
      .subscribe();
  }

  private setCartFilter(optionData: string): void {
    if (!optionData) {
      return;
    }

    if (optionData === 'all') {
      delete this.filtration['sale'];
    } else if (optionData === 'new order') {
      this.filtration['sale'] = "wait";
    }else if(optionData === 'pending'){
      this.filtration['sale'] = "pending";
    }
    else if(optionData === 'returned'){
      this.filtration['sale'] = "returned";
    }else{
      this.filtration['sale'] = "delivered";
    }

    this.cartsService.getCarts(this.filtration).subscribe((res: any) => {
      this.dataSource = res.carts;
      this.total = res.totalItems;
    });
  }

  selectDate(event: any, type: string) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
    if (type !== 'toDate' && this.filtration['toDate'] !== 'Invalid date') {
      this.getAllCarts();
    }
  }

  getAllCarts() {
    this.cartsService.getCarts(this.filtration).subscribe((response: any) => {
      this.dataSource = response.carts;
      this.total = response.totalItems;
    });
  }

  ConfirmDeleteCart(id: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px';
    // dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      type: 'cart',
      id,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCarts();
    });
  }

  viewCart(cartId: string, userId: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '800px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      cartId,
      userId
    };
    const dialogRef = this.dialog.open(ViewCartComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCarts();
    });
  }

  onTableDataChange(event: any) {
    this.page = event.pageIndex + 1; // Adjust if needed based on your API (0-based or 1-based)
    this.filtration.page = this.page;
    this.getAllCarts();
  }
}
