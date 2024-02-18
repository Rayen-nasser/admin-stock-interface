import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-finished-products',
  templateUrl: './finished-products.component.html',
  styleUrls: ['./finished-products.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.5s')
      ])
    ])
  ]
})
export class FinishedProductsComponent implements OnInit{
  products : any

  constructor(private service: SalesService){ }
  ngOnInit(): void {
    this.service.getFinishedProducts().subscribe((res: any) => {
      this.products = res.products
    })
  }

}
