import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-attendence',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './student-attendence.component.html',
  styleUrl: './student-attendence.component.scss'
})





export class StudentAttendenceComponent implements OnInit {
  studentId: string = ''; // Retrieve from AuthService after login
  attendanceSummary: { teacherName: string; status: string; date: string }[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId();
    if (this.studentId) {
      this.fetchAttendanceSummary();
    } else {
      console.error('Student ID not found. Please log in again.');
    }
  }
  
  fetchAttendanceSummary(): void {
    const apiUrl = `http://localhost:8091/api/attendance/student/${this.studentId}/attendance`;
    this.http.get(apiUrl, { responseType: 'text' }).subscribe({
      next: (response) => {
        // Parse the response to JSON since responseType is text
        this.attendanceSummary = JSON.parse(response) as { teacherName: string; status: string; date: string }[];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching attendance:', error);
        this.isLoading = false;
      },
    });
  }
  
}

