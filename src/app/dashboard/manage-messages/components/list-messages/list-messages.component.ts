import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { ToastrService } from 'ngx-toastr';

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
    limit: 4
  };
  pageSizeOptions!: any;
  timeout: any;

  constructor(
    private service: MessagesService,
    private toastr: ToastrService
  ) {}
  messages: any;
  ngOnInit(): void {
    this.getAllMessages();
  }

  getAllMessages() {
    this.service.getMessages(this.filtration).subscribe((data: any) => {
      this.messages = data.messages;
      this.total = data.totalItems;
    });
  }

  readIt(id: string) {
    this.service.messageIsRead(id).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.getAllMessages();
    });
  }

  search(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration['subject'] = event.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getAllMessages();
    }, 2000);
  }

  selectMessages(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    if (event.value !== 'all') {
      this.filtration['isReadIt'] = event.value;
    } else {
      delete this.filtration['isReadIt'];
    }
    this.getAllMessages();
  }

  onTableDataChange(event: any) {
    this.page = event.pageIndex + 1;
    this.filtration.page = this.page;
    this.getAllMessages();
  }
}
