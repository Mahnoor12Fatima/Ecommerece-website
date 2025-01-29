import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from './services/announcement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit {
  

 
  
  constructor(private announcementService:AnnouncementService){}
  ngOnInit(): void {
    
  }
 

  
}
