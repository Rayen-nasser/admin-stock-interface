import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ProductsService } from '../manage-products/service/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sidebarOpen = false;
  isSubMenuVisible = false;
  userDate: any;
  categories: string[] = [];
  categoriesCached = false;
  selectedCategory: string | null = null;
  private optionDataSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private productsService: ProductsService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlAfterRedirects = event.urlAfterRedirects || '';
        this.updateCategories(urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  updateCategories(url: any): void {
    switch (true) {
      case url.includes('/products'):
        this.fetchCategories();
        break;
      case url.includes('/users'):
        this.categories = ['all', 'clients', 'just visitor'];
        break;
      case url.includes('/carts'):
        this.categories = ['all', 'Pending', 'new order','Returned', 'Delivered'];
        break;
      default:
        this.categories = ['all', 'read', 'new message'];
        break;
    }
  }

  fetchCategories(): void {
    this.productsService.getCategories().subscribe(
      (response: any) => {
        console.log(response);

        if (response.categories && Array.isArray(response.categories)) {
          this.categories = ['all', ...response.categories];
          this.categoriesCached = true;
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  updateCategoryData(value: any): void {
    this.selectedCategory = value;
    const dataType = this.getDataTypeFromRoute();
    if (this.optionDataSubscription) {
      this.optionDataSubscription.unsubscribe(); // Cancel existing subscription
    }
    this.optionDataSubscription = this.sharedService
      .getOptionData(dataType)
      .subscribe((currentOptionData) => {
        if (value !== currentOptionData) {
          this.sharedService.setOptionData(dataType, value);
        }
      });
  }

  updateSearchData(event: any): void {
    const dataType = this.getDataTypeFromRoute();
    const value = event.target.value;
    if (this.optionDataSubscription) {
      this.optionDataSubscription.unsubscribe(); // Cancel existing subscription
    }
    this.optionDataSubscription = this.sharedService
      .getSearchData(dataType)
      .subscribe((currentSearchData) => {
        if (value !== currentSearchData) {
          this.sharedService.setSearchData(dataType, value);
        }
      });
  }

  private getDataTypeFromRoute(): string {
    const currentRoute = this.router.url;
    switch (true) {
      case currentRoute.includes('/products'):
        return 'product';
      case currentRoute.includes('/users'):
        return 'user';
      case currentRoute.includes('/messages'):
        return 'message';
      case currentRoute.includes('/cart'):
        return 'cart';
      default:
        console.error('Unknown route');
        return '';
    }
  }

  getUserData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userDate = JSON.parse(window.atob(token.split('.')[1]));
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.isSubMenuVisible = false;
  }

  toggleSubMenu(event: MouseEvent): void {
    if (this.sidebarOpen) {
      event.stopPropagation();
      this.isSubMenuVisible = !this.isSubMenuVisible;
    }
  }
}
