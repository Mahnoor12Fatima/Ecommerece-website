import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  categories: category[] = [];
  constructor(private product: ProductService,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((data: category[]) => {
      this.categories = data;
    });
  }

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3001);
  }
}
