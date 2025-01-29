import { Injectable } from '@angular/core';
import { category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3001/category';


  constructor(private http: HttpClient) { }

  addCategory(data: category): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getCategoryList(): Observable<category[]> {
    return this.http.get<category[]>(this.apiUrl);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategory(id: string): Observable<category> {
    return this.http.get<category>(`${this.apiUrl}/${id}`);
  }
}
