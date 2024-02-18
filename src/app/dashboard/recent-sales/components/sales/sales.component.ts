import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import * as numeral from 'numeral';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{
  salesRecent: any
  numeral = numeral;

  constructor(private service: SalesService){ }

  ngOnInit(): void {
    this.service.getRecentSales().subscribe((res: any) => {
      this.salesRecent = res.sales;
    })
  }
}
