import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  url: string = environment.baseApi.replace('auth','cart')

  constructor(
    private http: HttpClient
  ) { }

  getCarts(
    cartsFilter?: any
    ){
    let params = new HttpParams()

    Object.entries(cartsFilter).forEach(([key, value] : any) => {
      params = params.append(key, value)
    })

    return this.http.get( this.url +'/all-carts', {params})
  }

  getSingleCart(
    cartId: string
  ){
    return this.http.get(this.url + '/' + cartId)
  }

  getProductById(
    productId: string
  ){
    return this.http.get(environment.baseApi.replace('auth','stock') + '/product-details/' + productId)
  }

  getCartsOfUserId(
    userId: string
  ){
    return this.http.get(this.url + '/user/' + userId)
  }

  deleteCart(
    cartId: string
  ){
    return this.http.delete(this.url+'/'+cartId);
  }

  getUserDetails(
    userId: string
  ){
    return this.http.get(environment.baseApi + "/user-details/" + userId)
  }

  acceptTheOrder(data: any){
    let params = new HttpParams()

    Object.entries(data).forEach(([key, value] : any) => {
      if(value){
        params = params.append(key, value)
      }
    })
    return this.http.get(this.url +  "/accept-order", {params})
  }
}
