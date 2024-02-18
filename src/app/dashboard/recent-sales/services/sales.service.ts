import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  cartApi: string = environment.baseApi.replace('auth', 'cart')
  analyticsApi: string = environment.baseApi.replace('auth', 'analytics')

  constructor(
    private http: HttpClient
  ) { }

  getRecentSales(){
    return  this.http.get(this.cartApi +  '/recent-sales');
  }

  getTopSales(){
    return  this.http.get(this.analyticsApi +  '/top-selling');
  }

  getFinishedProducts(){
    return  this.http.get(this.analyticsApi +  '/product-finished');
  }

  getTotalBudget(){
    return  this.http.get(this.analyticsApi +  '/total-budget');
  }

  getTotalOrders(){
    return  this.http.get(this.analyticsApi +  '/total-orders');
  }

  getTotalProfits(){
    return  this.http.get(this.analyticsApi +  '/total-profits');
  }

  getTotalReturned(){
    return  this.http.get(this.analyticsApi +  '/total-returned');
  }
}
