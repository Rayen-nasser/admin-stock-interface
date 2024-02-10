import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { SharedService } from 'src/app/dashboard/services/shared.service';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.scss'],
})
export class ListMessagesComponent implements OnInit {
  total!: number;
  page: number = 1;
  filtration: any = {
    page: this.page,
    limit: 4,
  };
  pageSizeOptions!: any;

  constructor(
    private service: MessagesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}
  dataSource: any;
  optionData$!: Observable<string>;
  searchData$!: Observable<string>;

  ngOnInit(): void {
    combineLatest([
      this.sharedService.getSearchData(),
      this.sharedService.getOptionData(),
    ])
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(([searchData, optionData]) => {
          this.page = 1;
          this.filtration['page'] = 1;
          this.filtration['subject'] = searchData;
          this.setClientFilter(optionData);
        })
      )
      .subscribe();

    this.getAllMessages();
  }

  private setClientFilter(optionData: string): void {
    if (!optionData) {
      return;
    }

    if (optionData === 'all') {
      delete this.filtration['isReadIt'];
    } else if (optionData === 'not yet') {
      this.filtration['isReadIt'] = false;
    } else {
      this.filtration['isReadIt'] = true;
    }

    this.service.getMessages(this.filtration).subscribe((res: any) => {
      this.dataSource = res.messages;
      this.total = res.totalItems;
    });
  }

  getAllMessages() {
    this.service.getMessages(this.filtration).subscribe((data: any) => {
      this.dataSource = data.messages;
      this.total = data.totalItems;
    });
  }

  readIt(id: string) {
    this.service.messageIsRead(id).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.getAllMessages();
    });
  }

  onTableDataChange(event: any) {
    this.page = event.pageIndex + 1;
    this.filtration.page = this.page;
    this.getAllMessages();
  }
}
