import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-exam-schedule',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-exam-schedule.component.html',
  styleUrl: './view-exam-schedule.component.scss'
})

export class ViewExamScheduleComponent implements OnInit {
  studentId: string = ''; // Logged-in student's ID
  timetable: any[] = []; // List of exams

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId();
    if (this.studentId) {
      this.loadTimetable();
    } else {
      console.error('Student ID not found.');
    }
  }

  loadTimetable() {
    const apiUrl = `http://localhost:8091/api/exams/student/${this.studentId}/timetable`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.timetable = response;
      },
      error: (err) => {
        console.error('Failed to load timetable', err);
      },
    });
  }
}

