import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  categories: any = [];
  dataSource: any = [];
  displayedColumns: string[] = [
    'name',
    'marque',
    'quantity',
    'deadLineDate',
    'price',
    'status',
    'edit',
    'delete',
  ];
  page: number = 1;
  total: number = 0;
  filtration: any = {
    page: this.page,
    limit: 4,
  };
  pageSizeOptions!: any;
  searchData$!: Observable<string>;
  optionData$!: Observable<string>;
  numeral = numeral;

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
    private toaster: ToastrService,
    private sharedService: SharedService
  ) {
    this.getAllProducts()
  }

  ngOnInit(): void {
    combineLatest([
      this.sharedService.getSearchData('product'),
      this.sharedService.getOptionData('product'),
    ])
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(([searchData, optionData]) => {
          this.page = 1;
          this.filtration['page'] = 1;
          this.filtration['productName'] = searchData;
          if (optionData) {
            optionData == 'all'
              ? this.getAllProducts()
              : this.productsService
                  ?.getProductsInCategory(optionData)
                  ?.subscribe((res: any) => {
                    this.dataSource = res.products;
                    this.total = res.totalItems;
                  });
          }
        })
      )
      .subscribe();
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '600px';
    dialogConfig.maxHeight = '90vh';

    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProducts();
    });
  }

  updateProduct(dataProduct: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = { ...dataProduct };

    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProducts();
    });
  }

  getAllProducts() {
    this.productsService
      .getProducts(this.filtration)
      .subscribe((response: any) => {
        this.dataSource = response.products;
        this.total = response.totalItems;
      });
  }

  onTableDataChange(event: any) {
    this.page = event.pageIndex + 1;
    this.filtration.page = this.page;
    this.getAllProducts();
  }

  calculatePageSizeOptions() {
    const pageSizeFactor = 3; // Adjust this factor based on your business logic

    // Calculate pageSizeOptions based on the total number of items
    const maxPageSize = Math.ceil(this.total / pageSizeFactor);
    this.filtration.limit = maxPageSize; // Set the limit to the maximum possible value
    this.page = 1; // Reset the page to the first page

    // Generate pageSizeOptions array dynamically
    this.pageSizeOptions = Array.from(
      { length: maxPageSize },
      (_, index) => (index + 1) * pageSizeFactor
    );
  }

  ConfirmDeleteProduct(id: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      type: 'product',
      id,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProducts();
    });
  }

  toggleStatus(id: string, name: string ) {
    this.productsService.changeStatusProduct(id).subscribe((res: any) => {
      this.toaster.success(res.message , 'Success');
      this.getAllProducts();
    });
  }
}
