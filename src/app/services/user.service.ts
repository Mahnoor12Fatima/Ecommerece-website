import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login } from '../models/login.model';
import { signUp } from '../models/singUp.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
invalidUserAuth= new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router:Router) { }
  
  userSignUp(user: signUp) {
    this.http.post('http://localhost:3001/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/user-auth']); // Redirect to login page after signup
        }
      });
  }

  userLogin(data: login) {
    this.http.get<signUp[]>(`http://localhost:3001/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
