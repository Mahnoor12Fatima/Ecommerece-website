import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-list',
 
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css'
})
export class AnnouncementListComponent implements OnInit{
  announcements: any[] = [];
  newAnnouncement: any = { title: '', content: '' };

  constructor(private announcementService: AnnouncementService){}
  ngOnInit(): void {
    this.loadAnnouncements();
  }
  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe(
      (data: any[]) => {
        this.announcements = data;
      },
      (error) => {
        console.log('Error fetching announcements: ', error);
      }
    );
  }
  deleteAnnouncement(id: number) {
    this.announcementService.deleteAnnouncement(id).subscribe(
      (response: any) => {
        console.log('Announcement deleted successfully: ', response);
        this.loadAnnouncements(); // Refresh announcements after deleting
      },
      (error) => {
        console.log('Error deleting announcement: ', error);
      }
    );
    
    this.loadAnnouncements();

  }

}
