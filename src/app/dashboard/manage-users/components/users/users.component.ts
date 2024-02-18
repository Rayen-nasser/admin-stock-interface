import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/dashboard/manage-products/components/confirmation/confirmation.component';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { SharedService } from 'src/app/dashboard/services/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = [
    'position',
    'profile',
    'name',
    'email',
    'status',
    'delete'
  ];

  dataSource: any = [];
  total!: number;
  page: number = 1;
  filtration: any = {
    page: this.page,
    limit: 4,
  };
  pageSizeOptions!: any;
  timeout: any
  searchData$!: Observable<string>;
  optionData$!: Observable<string>;

  constructor(
    private service: UsersService,
    private toaster: ToastrService,
    public dialog: MatDialog,
    private sharedService: SharedService,
  ) {
    this.getAllUsers()
   }

  ngOnInit(): void {
    combineLatest([
      this.sharedService.getSearchData('user'),
      this.sharedService.getOptionData('user'),
    ]).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(([searchData, optionData]) => {
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration['username'] = searchData;
        this.setClientFilter(optionData);
      })
    ).subscribe();
  }

  private setClientFilter(optionData: string): void {
    if (!optionData) {
      return;
    }

    if (optionData === 'clients') {
      this.filtration['isBeClient'] = true;
    } else if (optionData === 'just visitor') {
      this.filtration['isBeClient'] = false;
    } else {
      delete this.filtration['isBeClient'];
    }

    this.service.getUsers(this.filtration).subscribe((res: any) => {
      this.dataSource = res.users;
      this.total = res.totalItems;
    });
  }

  getAllUsers(){
    this.service.getUsers(this.filtration).subscribe((res: any) => {
      this.dataSource = res.users
      this.total = res.totalItems
    })
  }

  ConfirmDeleteUser(id: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      type: 'user',
      id,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  toggleStatus(id: string) {
    this.service.changeStatus(id).subscribe((res: any) => {
      this.toaster.success(res.message);
      this.page = 1;
      this.getAllUsers();
    });
  }

  onTableDataChange(event: any) {
    console.log(event.pageIndex);

    this.page = event.pageIndex + 1; // Adjust if needed based on your API (0-based or 1-based)
    this.filtration.page = this.page;
    this.getAllUsers();
  }

}
