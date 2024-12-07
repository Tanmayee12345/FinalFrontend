import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentleaverequest',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './studentleaverequest.component.html',
  styleUrl: './studentleaverequest.component.scss'
})


export class StudentleaverequestComponent implements OnInit {
  studentId: string = '';
  teacherId: string = '';
  startDate: string = '';
  endDate: string = '';
  reason: string = '';
  teachers: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId();
    this.loadTeachers();
  }

  loadTeachers() {
    const apiUrl = `http://localhost:8091/api/messages/${this.studentId}/teachers`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.teachers = response;
      },
      error: (error) => {
        console.error('Error fetching teachers:', error);
        alert('Failed to load teachers.');
      }
    });
  }

  submitLeaveRequest() {
    const apiUrl = `http://localhost:8091/api/leave/student/${this.studentId}/request`;
    const payload = {
      teacherId: this.teacherId,
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason,
    };
  
    this.http.post(apiUrl, payload, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Response:', response); // Log the response for debugging
        alert('Leave request submitted successfully.');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error submitting leave request:', error);
        alert('Failed to submit leave request.');
      },
    });
  }
  

  resetForm() {
    this.teacherId = '';
    this.startDate = '';
    this.endDate = '';
    this.reason = '';
  }
}

