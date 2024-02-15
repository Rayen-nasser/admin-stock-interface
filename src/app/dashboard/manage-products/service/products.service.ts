import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.baseApi.replace('auth', 'stock')

  constructor(
    private http: HttpClient
  ) { }

  getProducts(
      productsFilter?: any
    ){
    let params = new HttpParams()

    Object.entries(productsFilter).forEach(([key, value] : any) => {
      if(value){
        params = params.append(key, value)
      }
    })

    return this.http.get( this.url +'/all-products', {params})
  }

  getCategories(){
    return this.http.get( this.url +'/categories')
  }

  getProductsInCategory(category: any){
    return this.http.get( this.url +'/category/'+  category)
  }

  addProduct (product: any) {
    return this.http.post(this.url + "/add-product", product)
  }

  editProduct (id:string, product: any) {
    return this.http.put(this.url + "/edit-product/" + id , product)
  }

  deleteProduct(id: string){
    return this.http.delete(this.url + '/delete-product/' + id);
  }

  changeStatusProduct(id: string){
    return this.http.get(this.url + '/change-status/' + id);
  }

}
