import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductsListComponent } from '../products-list/products-list.component';
import { category } from 'src/app/models/category.model';
import { product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { QuickViewComponent } from '../quick-view/quick-view.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  filteredProducts: any[] = [];
  newArrivalProducts: any[] = [];
  priceFrom: number | null = null;
  priceTo: number | null = null;
  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
  filteredCategories: string[] = [];
  saleProducts: any[] = [];
  products: any[] = [];
  categories: category[] = [];

  //searchTerm: string = ''; 
   constructor(private productService: ProductService,private categoryService:CategoryService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })
    this.productService.productList().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });
    this.productService.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });
    // Fetch products and categories separately
    this.productService.trendyProducts().subscribe((trendyProducts) => {
      this.products = trendyProducts;
       this.saleProducts = this.filterSaleProducts(); // Add this line
      this.newArrivalProducts = this.products.filter(product => product.isNewArrival); // Filter new arrival products
  
 
    });
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.categories = categories;
    });
  
  }
  filterSaleProducts(): any[] {
    return this.products.filter(product => product.onSale);
  }
  
  navigateToCategory(category: string) {
    // Navigate to a route with the category parameter
    this.router.navigate(['/products-list', { category: category }]); 
  }

  getUniqueCategories(products: any[]): string[] {
    // Extract unique categories from products
    const categoriesSet = new Set<string>();
    products.forEach((product) => {
      // Convert category to lowercase for comparison
      const lowercaseCategory = product.category.toLowerCase();
      categoriesSet.add(lowercaseCategory);
    });
    return Array.from(categoriesSet);
  }
 /* filterCategories() {
    this.filteredCategories = this.categories.filter(category =>
      category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/
    filterProducts(): void {
      if (this.priceFrom !== null && this.priceTo !== null && this.priceTo < this.priceFrom) {
        this.priceTo = this.priceFrom;
      }
  
      this.filteredProducts = this.products.filter(product =>
        (!this.priceFrom || product.price >= this.priceFrom) &&
        (!this.priceTo || product.price <= this.priceTo)
      );
    }
  
    openPopup(productId: number): void {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        const dialogRef = this.dialog.open(QuickViewComponent, {
          width: '55%', data: product,
          disableClose: true
        });
  
        dialogRef.afterClosed().subscribe(() => {
          console.log('Dialog closed');
        });
      }
    }
  
}
