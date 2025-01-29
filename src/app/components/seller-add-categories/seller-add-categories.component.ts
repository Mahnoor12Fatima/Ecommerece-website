import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-seller-add-categories',
  
  templateUrl: './seller-add-categories.component.html',
  styleUrls: ['./seller-add-categories.component.css'],
  
})
export class SellerAddCategoriesComponent implements OnInit {
  addCategoryMessage: string | undefined;
  constructor(private category:CategoryService){}
  ngOnInit(): void {
    
  }
  
  submit(data:category) {
    this.category.addCategory(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addCategoryMessage = 'Category is added successfully';
      }
    });

    setTimeout(() => {
      this.addCategoryMessage=undefined
    }, 3001);
  }

}
