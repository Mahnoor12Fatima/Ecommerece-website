import { NgModule ,Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { QuickViewComponent } from './components/quick-view/quick-view.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { SellerAddCategoriesComponent } from './components/seller-add-categories/seller-add-categories.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ProductsListComponent,
    path: 'products-list',
    
  },
  {
    component: SellerAuthComponent,
    path: 'seller-auth'
  },
  {
    component: SellerAddCategoriesComponent,
    path: 'seller-category',
    canActivate:[AuthGuard]
  },
  {
    component:SellerHomeComponent,
    path:'seller-home',
    canActivate:[AuthGuard]
  },
  {
    component:AnnouncementComponent,
    path:'announcement',
    canActivate:[AuthGuard]
  },
  {
    component: CategoryListComponent,
    path: 'category-list',
    canActivate:[AuthGuard]
    
  },
  {
    component:AnnouncementListComponent,
    path:'announcement-list',
    canActivate:[AuthGuard]
  },{
    component:SellerAddProductComponent,
    path:'seller-add-product',
    canActivate:[AuthGuard]
  },{
    component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[AuthGuard]
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
 {
    component:UserAuthComponent,
    path:'user-auth'
  },{
    component:CartPageComponent,
    path:'cart-page',
    
  },{
    component:CheckoutComponent,
    path:'checkout'
  },{
    component:MyOrdersComponent,
    path:'my-orders'
  }, {
    component:CartListComponent,
    path:'cart-list'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
