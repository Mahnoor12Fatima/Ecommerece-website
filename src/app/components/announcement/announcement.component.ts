import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement',

  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit {
  announcements: any[] = [];
  newAnnouncement: any = { title: '', content: '' };

  constructor(private announcementService: AnnouncementService) { }

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

  submitAnnouncement() {
    if (this.newAnnouncement.title && this.newAnnouncement.content) {
      this.announcementService.addAnnouncement(this.newAnnouncement).subscribe(
        (response: any) => {
          console.log('Announcement added successfully: ', response);
          this.newAnnouncement.title = '';
          this.newAnnouncement.content = '';
          this.loadAnnouncements(); // Refresh announcements after adding
        },
        (error) => {
          console.log('Error adding announcement: ', error);
        }
      );
    }
  }

}
