import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',

  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: category[] = [];
  constructor(private categoryService: CategoryService){}
  ngOnInit(): void {
    
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categories = data;
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      // After deletion, refresh the category list
      this.fetchCategories();
    });
  }

}
