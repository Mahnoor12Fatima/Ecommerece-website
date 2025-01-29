import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { category } from 'src/app/models/category.model';
import { product } from 'src/app/models/product.model';
import { AnnouncementService } from '../../services/announcement.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  title = 'ecomm-project';
  announcements: any[] = [];
  products: product[] = [];
  categories: category[] = [];
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  cartItems = 0;
  category: string = '';
  filteredProducts: product[] = [];
  searchTerm: string = '';
  isDropdownOpen: boolean = false;
  localStorageArray: Array<{ key: string, value: any }> = [];
  userCartHistory: any[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    
    const user = localStorage.getItem('user');
    if (user) {
      this.userName = JSON.parse(user).name;
    }

    this.loadAnnouncements();

    this.productService.trendyProducts().subscribe((trendyProducts) => {
      this.products = trendyProducts;
      this.filteredProducts = [];
      this.categoryService.getCategoryList().subscribe((categories) => {
        this.categories = categories;
      });
    });

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          
          this.productService.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }
  showLocalStorageData() {
    const localStorageData: { [key: string]: any } = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (this.isJSON(value)) {
          localStorageData[key] = JSON.parse(value || '{}');
        } else {
          localStorageData[key] = value;
        }
      }
    }

    console.log('Local Storage Data:', localStorageData);
  }
  

  // Helper method to check if a string is valid JSON
  isJSON(str: string | null): boolean {
    if (str === null) {
      return false;
    }
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  loadUserCartData() {
    const localStorageData = localStorage.getItem('user');
    if (localStorageData) {
      try {
        this.userCartHistory = JSON.parse(localStorageData);
        console.log('User Cart Data:', this.userCartHistory); // Verify the data in the console
      } catch (error) {
        console.error('Error parsing localStorage data', error);
      }
    }}
 
  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe((announcements) => (this.announcements = announcements));
  }

  navigateToCategory(event: any) {
    const category = event.target.value;
    if (category) {
      this.router.navigate(['/products-list', { category: category }]);
    }
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  /*
  userLogout() {
    // Store user-related data for admin viewing
    this.storeUserDataForAdmin();

this.loadUserCartData() ;
    this.showLocalStorageData();
    // Clear user-related data upon logout
   // localStorage.removeItem('user');
    localStorage.removeItem('localCart');

    this.router.navigate(['/']);
  }*/
   /* userLogout() {
      // Store user-related data for admin viewing
      this.storeUserDataForAdmin();
      this.showLocalStorageData();
      // Load and display userCartData
      this.loadUserCartData();
      localStorage.removeItem('user');
  

      this.showLocalStorageData();
      // Clear other user-related data upon logout
     // localStorage.removeItem('localCart'); // Assuming this is separate from userCart
    
      this.router.navigate(['/']);
    }*/
    userLogout() {
    // Store user-related data for admin viewing
    this.storeUserDataForAdmin();
    
this.loadUserCartData() ;
    this.showLocalStorageData();
    

    // Save user cart history data to localStorage
    
    // Clear user-related data upon logout
   // localStorage.removeItem('user');
    localStorage.removeItem('localCart'); // Assuming this is separate from userCart

    this.router.navigate(['/']);
}

    

  storeUserDataForAdmin() {
    
    let adminViewUserData: any[] = JSON.parse(localStorage.getItem('adminViewUserData') || '[]');
  
    // Prepare user data to store
    const userData = {
      username: this.userName,
      cartItems: this.cartItems // Assuming you have cartData stored for each user
    };
  
    // Ensure adminViewUserData is initialized properly
    if (!Array.isArray(adminViewUserData)) {
      adminViewUserData = [];
    }
  
    // Append user data to the array
    adminViewUserData.push(userData);
  
    // Store updated admin view user data in localStorage
    localStorage.setItem('adminViewUserData', JSON.stringify(adminViewUserData));
  }
  
  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.filterProducts();
    }
  }

  filterProducts(): void {
    if (this.searchTerm.trim() !== '') {
      const searchTermLC = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTermLC) ||
        product.category.toLowerCase().includes(searchTermLC) ||
        product.color.toLowerCase().includes(searchTermLC) ||
        product.price.toString().toLowerCase().includes(searchTermLC)
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  closeDropdown(): void {
    this.searchTerm = '';
  }

  shouldShowSearchBar(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '' || currentRoute === '/' || currentRoute.includes('products-list') || currentRoute.includes('seller-home');
  }
}