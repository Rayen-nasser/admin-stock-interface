import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit{
  categories: any = []
  dataSource: any = []
  displayedColumns: string[] = [
    'No.',
    'name',
    'quantity',
    'deadLineDate',
    'price',
    'status',
    'actions',
  ];
  page: number = 1
  total : number = 0
  filtration: any = {
    page: this.page,
    limit: 4,
  };
  pageSizeOptions!: any;
  timeOut: any;


  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
    private toaster: ToastrService
  ){
    this.getDataFromSubject()
  }

  ngOnInit(): void {
    this.getAllCategories()
    this.getAllProducts()
  }

  getAllCategories(){
    this.productsService.getCategoriesData();
  }

  getDataFromSubject(){
    this.productsService.categoriesData.subscribe((response:any) => {
        this.categories = response.data
      })
  }

  addProduct(){
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

  search(event : any){
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration['productName'] = event.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllProducts();
    }, 2000);
  }

  selectCategory(event: any){
    this.page = 1;
    this.filtration['page'] = 1;
    this.productsService.getProductsInCategory(event.value).subscribe((res: any) => {
      this.dataSource = res.products
      this.total = res.totalItems
    })
  }

  selectDate(event : any, type: string){
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
    if (type !== 'toDate' && this.filtration['toDate'] !== 'Invalid date') {
      this.getAllProducts();
    }
  }

  getAllProducts(){
    this.productsService.getProducts(this.filtration).subscribe(
      (response: any)=>{
        this.dataSource = response.products
        this.total = response.totalItems
      }
    )
  }

  onTableDataChange(event: any) {
    console.log(event.pageIndex);

    this.page = event.pageIndex + 1; // Adjust if needed based on your API (0-based or 1-based)
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

    dialogConfig.width = '500px';
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

  toggleStatus(id: string){
    this.productsService.changeStatusProduct(id).subscribe((res: any) => {
      this.toaster.success(res.message , "Success")
      this.getAllProducts()
    })
  }
}
