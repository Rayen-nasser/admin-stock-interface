import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CartsService } from '../../service/carts.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/dashboard/manage-products/components/confirmation/confirmation.component';
import { ViewCartComponent } from '../view-cart/view-cart.component';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit{

  displayedColumns: string[] = [
    'userId',
    'date',
    'quantity',
    'amountTotal',
    'actions'
  ];

  page: number = 1
  total : number = 0
  filtration: any = {
    page: this.page,
    limit: 4,
  };
  pageSizeOptions!: any;
  timeOut: any;
  dataSource: any

  constructor(
    private cartsService: CartsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.getAllCarts()
  }

  selectDate(event : any, type: string){
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
    if (type !== 'toDate' && this.filtration['toDate'] !== 'Invalid date') {
      this.getAllCarts();
    }
  }

  selectCart(event: any) {
    
    this.filtration['accepted'] = event.value;
    this.page = 1;
    if (event.value !== 'all') {
      this.filtration['accepted'] = event.value;
    } else {
      delete this.filtration['accepted'];
    }
    this.getAllCarts();
  }

  getAllCarts(){
    this.cartsService.getCarts(this.filtration).subscribe(
      (response: any)=>{
        this.dataSource = response.carts
        this.total = response.totalItems
      }
    )
  }

  ConfirmDeleteCart(id: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.height = 'auto';
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

  viewCart(products: any, userId: string, address: any ,cartId: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '800px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      type: 'cart',
      products,
      userId,
      address,
      cartId
    };
    const dialogRef = this.dialog.open(ViewCartComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCarts();
    });
  }

  onTableDataChange(event: any) {
    console.log(event.pageIndex);

    this.page = event.pageIndex + 1; // Adjust if needed based on your API (0-based or 1-based)
    this.filtration.page = this.page;
    this.getAllCarts();
  }
}
