import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as numeral from 'numeral';

@Component({
  selector: 'app-top-seling',
  templateUrl: './top-seling.component.html',
  styleUrls: ['./top-seling.component.scss'],
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

export class TopSelingComponent implements OnInit{
  numeral = numeral;
  topSelling: any
  constructor(private service: SalesService){ }

  ngOnInit(): void {
    this.service.getTopSales().subscribe((res: any) => {
      this.topSelling = res.selling;
    })
  }
}
