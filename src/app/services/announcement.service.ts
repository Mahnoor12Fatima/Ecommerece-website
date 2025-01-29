import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:3001/announcements'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }
  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAnnouncement(newAnnouncement: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newAnnouncement);
  }
  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
