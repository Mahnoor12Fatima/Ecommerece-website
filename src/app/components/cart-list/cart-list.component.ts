/*import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/models/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-list',

  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  cartItems: cart[] = [];
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.productService.currentCart().subscribe((data: cart[]) => {
      this.cartItems = data;
    });
  }

}*/
import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/models/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-list',

  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  adminViewUserData: any[]=[];
  cartItems: cart[] = [];
  
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.retrieveAdminViewUserData();}
    retrieveAdminViewUserData() {
      this.adminViewUserData = JSON.parse(localStorage.getItem('adminViewUserData') || '[]');
      
    }

}
