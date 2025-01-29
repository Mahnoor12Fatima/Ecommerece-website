import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login } from '../models/login.model';
import { signUp } from '../models/singUp.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
 
  userSignUp(data: signUp): void {
    this.http.post('http://localhost:3001/seller', data, { observe: 'response' }).subscribe(
      (result) => {
        if (result.body) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.handleLoginSuccess();
        }
      },
      (error) => {
        console.error('Sign-up error:', error);
        // Handle error appropriately, e.g., show error message to user
      }
    );
  }

  userLogin(data: login): void {
    this.http.get(`http://localhost:3001/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe(
      (result: any) => {
        if (result && result.body && result.body.length === 1) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.handleLoginSuccess();
        } else {
          console.warn('Login failed');
          this.isLoginError.next(true);
        }
      },
      (error) => {
        console.error('Login error:', error);
        // Handle error appropriately, e.g., show error message to user
        this.isLoginError.next(true);
      }
    );
  }

  private handleLoginSuccess(): void {
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['seller-home']);
  }

  logout(): void {
    localStorage.removeItem('seller');
    this.isSellerLoggedIn.next(false);
    this.router.navigate(['/seller-auth']); // Navigate to login page after logout
  } reloadSeller(): void {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
