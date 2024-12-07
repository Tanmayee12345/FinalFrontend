import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-student-timetable',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.scss'],
})
export class StudentTimetableComponent implements OnInit {
  studentId: string | null = null; // Store studentId
  timetable: any[] | null = null; // Timetable data
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timeSlots: any[] = [
    { startTime: '09:00', endTime: '09:45' },
    { startTime: '10:00', endTime: '10:45' },
    { startTime: '11:00', endTime: '11:45' },
    { startTime: '12:00', endTime: '12:45' },
    { startTime: '13:00', endTime: '13:45' },
    { startTime: '14:00', endTime: '14:45' },
    { startTime: '15:00', endTime: '15:45' },
    { startTime: '16:00', endTime: '16:45' },
  ];

  private storageKey: string = 'studentTimetable'; // Key for localStorage

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId();

    console.log('Retrieved Student ID from AuthService:', this.studentId);

    if (!this.studentId) {
      alert('Student ID not found. Please log in again.');
      this.router.navigate(['/login']);
    } else {
      this.loadTimetable();
    }
  }

  // Load timetable from localStorage or fetch from server
  loadTimetable() {
    const cachedTimetable = localStorage.getItem(`${this.storageKey}_${this.studentId}`);
    if (cachedTimetable) {
      console.log('Loading timetable from cache');
      this.timetable = JSON.parse(cachedTimetable);
    } else {
      this.fetchTimetable();
    }
  }

  fetchTimetable() {
    const apiUrl = `http://localhost:8091/api/timetable/student/${this.studentId}/timetable`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        console.log('Fetched Timetable Response:', response);
        this.timetable = response;

        // Save timetable to localStorage
        localStorage.setItem(`${this.storageKey}_${this.studentId}`, JSON.stringify(response));
      },
      error: (error) => {
        alert('Error fetching timetable!');
        console.error('Error:', error);
        this.timetable = null;
      },
    });
  }

  getSlotData(day: string, startTime: string, endTime: string) {
    return this.timetable?.find(
      (slot) =>
        slot.day === day &&
        slot.startTime === startTime &&
        slot.endTime === endTime
    );
  }

  // Clear timetable from localStorage (useful for debugging or logout)
  clearCachedTimetable() {
    localStorage.removeItem(`${this.storageKey}_${this.studentId}`);
    console.log('Cleared cached timetable');
  }
}
