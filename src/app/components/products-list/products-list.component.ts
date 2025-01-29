import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { QuickViewComponent } from '../quick-view/quick-view.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  category: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  priceFrom: number | null = null;
  priceTo: number | null = null;

  //searchTerm: string = '';
  
  constructor(private route: ActivatedRoute,private dialog: MatDialog,private router:Router, private productService: ProductService) {}

  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      // Fetch products based on the category
      this.productService.getProductsByCategory(this.category).subscribe(products => {
        this.products = products;
        this.filteredProducts = [...this.products];
      });
    });
  }
  filterProducts(): void {
    // If priceTo is smaller than priceFrom, set priceTo equal to priceFrom
    if (this.priceFrom !== null && this.priceTo !== null && this.priceTo < this.priceFrom) {
      this.priceTo = this.priceFrom;
    }

    this.filteredProducts = this.products.filter(product =>
      (!this.priceFrom || product.price >= this.priceFrom) &&
      (!this.priceTo || product.price <= this.priceTo)
    );
  }
  openPopup(productId: number): void {
    // Find the product details based on the productId
    const product = this.products.find(p => p.id === productId);
    if (product) {
      // Open the dialog and pass the product data
      const dialogRef = this.dialog.open(QuickViewComponent, {
        width: '55%',
        height: '',
        data: product,
         disableClose: true // Pass product data to the dialog
      });
  
      // Subscribe to the dialog close event (optional)
      dialogRef.afterClosed().subscribe(() => {
        console.log('Dialog closed');
        // Add any necessary logic after the dialog is closed
      });
    }
  
  }
  /*filterProducts(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())||
        product.price.toLowerCase().includes(this.searchTerm.toLowerCase())||
        product.color.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If search term is empty, show all products
      this.filteredProducts = [...this.products];
    }
  }*/
}
