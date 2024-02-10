import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ProductsService } from '../manage-products/service/products.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sidebarOpen: boolean = false;
  isSubMenuVisible: boolean = false;
  userDate: any;
  categories: any = [];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private productsService: ProductsService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getUserData();
    this.getAllCategories()

  }

  getAllCategories() {
    this.productsService.getCategoriesData();
  }

  getDataFromSubject() {
    this.productsService.categoriesData.subscribe((response: any) => {
      this.categories = response.data;
    });
  }

  updateCategoryData(value: any): void {
    console.log(value);

    this.sharedService.setOptionData(value);
  }

  updateSearchData(event: any): void {
    this.sharedService.setSearchData(event.target.value);
  }

  getUserData() {
    let token = localStorage.getItem('token');

    if (token) {
      this.userDate = JSON.parse(window.atob(token.split('.')[1]));
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.isSubMenuVisible = false;
    this.menuBtnChange();
  }

  menuBtnChange(): void {
    const btnElement = document.getElementById('btn');
    if (btnElement) {
      if (this.sidebarOpen) {
        btnElement.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        btnElement.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }

  toggleSubMenu(event: MouseEvent): void {
    if (this.sidebarOpen) {
      event.stopPropagation();
      this.isSubMenuVisible = !this.isSubMenuVisible;
    }
  }
}
