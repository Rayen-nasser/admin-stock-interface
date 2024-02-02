import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../service/products.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent  implements OnInit{

  fileName! : string
  newProductForm!: FormGroup
  oldProductForm!: any
  categories : any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder ,
    public dialog: MatDialogRef<AddProductComponent> ,
    public matDialog:MatDialog,
    private toaster:ToastrService,
    private productsService: ProductsService
    ) {
      this.getDataFromSubject()
    }

    ngOnInit(): void {
        this.getAllCategories()
        this.createForm()
    }

    createForm() {
      this.newProductForm = this.fb.group({
        name: [this.data?.name || "", [Validators.required, Validators.minLength(5)]],
        description: [this.data?.description || "", Validators.required],
        deadline: [this.parseDate(this.data?.deadline) || "", Validators.required],
        imageUrl: [this.data?.imageUrl || "", Validators.required],
        price: [this.data?.price || null, [Validators.required]],
        category: [this.data?.category || "", [Validators.required]],
        quantity: [this.data?.quantity || null, [Validators.required]],
      });

      this.fileName = this.data ? this.data?.imageUrl : "";
      this.oldProductForm = this.newProductForm.value;
    }

    private parseDate(dateString: string): string | null {
      if (dateString) {
        const dateParts = dateString.split('-').map(part => parseInt(part));

        // Check if dateParts is a valid array of integers representing year, month, and day
        if (dateParts.length === 3 && dateParts.every(part => !isNaN(part))) {
          return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]).toISOString();
        } else {
          console.error('Invalid date format:', dateString);
        }
      }

      return null;
    }



    getAllCategories(){
      this.productsService.getCategoriesData();
    }

    getDataFromSubject(){
      this.productsService.categoriesData.subscribe((response:any) => {
          this.categories = response.data
        })
    }

    selectImage(event:any) {

      this.fileName = event.target.value
      this.newProductForm.get('imageUrl')?.setValue(event.target.files[0])
    }

    createProduct() {

      let model =  this.prepareFormData()
      this.productsService.addProduct(model).subscribe(res => {
        this.toaster.success("Product Created Successfully" , "Success")
        this.dialog.close(true)
      })
    }

    updateProduct(){

      let model =  this.prepareFormData()
      this.productsService.editProduct(this.data._id ,model).subscribe(res => {
        this.toaster.success("Product Created Successfully" , "Success")
        this.dialog.close(true)
      })
    }


    prepareFormData() {
      let newData = moment(this.newProductForm.value['deadline']).format('DD-MM-YYYY')
      let formData = new FormData()
      Object.entries(this.newProductForm.value).forEach(([key , value] : any) => {
        console.log(key , value);

        if(key == 'deadline') {
          formData.append(key , newData)
        }else if(key == 'imageUrl'){
          formData.append('image', value)
        }else{
          formData.append(key , value)
        }

      })

      return formData
    }

    close(){
      let hasChange = false
      Object.keys(this.oldProductForm).forEach((item) => {
        if(this.newProductForm.value[item] !== this.oldProductForm[item]){
          hasChange = true
        }
      })

      if(hasChange){
        const dialogRef = this.matDialog.open(ConfirmationComponent, {
          width: '750px',
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => { });
      }else{
        this.dialog.close();
      }
    }
}
