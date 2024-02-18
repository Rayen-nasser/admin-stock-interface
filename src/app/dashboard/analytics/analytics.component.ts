import { Component, OnInit } from '@angular/core';
import { SalesService } from '../recent-sales/services/sales.service';
import * as numeral from 'numeral';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements  OnInit {
  totalBudget: number = 0
  totalOrders: number = 0
  totalProfits: number = 0
  totalReturned: number = 0
  numeral = numeral;

  constructor(
    private salesService: SalesService
  ){ }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.salesService.getTotalBudget().subscribe((res: any) => {
      this.totalBudget = res.total;
    });

    this.salesService.getTotalOrders().subscribe((res: any) => {
      this.totalOrders = res.total;
    });

    this.salesService.getTotalProfits().subscribe((res: any) => {
      this.totalProfits = res.total;
    });

    this.salesService.getTotalReturned().subscribe((res: any) => {
      this.totalReturned = res.total;
    });
  }
}
