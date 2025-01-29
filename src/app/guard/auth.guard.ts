import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from '../services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService:SellerService,private router: Router){}
  canActivate(): boolean {
    // Check if seller is authenticated
    if (localStorage.getItem('seller')) {
      return true; // Seller is authenticated, allow access
    } else {
      // Seller is not authenticated, redirect to login page
      this.router.navigate(['/seller-auth']);
      return false;
    }
  }
  
} 
