import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-teacherrequest',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './student-teacherrequest.component.html',
  styleUrls: ['./student-teacherrequest.component.scss'],
})
export class StudentTeacherrequestComponent implements OnInit {
  teacherId: string = '';
  leaveRequests: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.teacherId = this.authService.getTeacherId();
    this.loadLeaveRequests();
  }

  loadLeaveRequests() {
    const apiUrl = `http://localhost:8091/api/leave/teacher/${this.teacherId}/requests`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.leaveRequests = response;
      },
      error: (error) => {
        console.error('Error fetching leave requests:', error);
        alert('Failed to load leave requests.');
      },
    });
  }

  respondToLeaveRequest(requestId: string, status: string) {
    const apiUrl = `http://localhost:8091/api/leave/teacher/respond/${requestId}`;
    const payload = { status, teacherId: this.teacherId }; // Include teacherId in the payload

    this.http.put(apiUrl, payload, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Response:', response); // Log the response for debugging
        alert(`Leave request ${status.toLowerCase()} successfully.`);
        this.loadLeaveRequests(); // Refresh the leave requests
      },
      error: (error) => {
        console.error('Error responding to leave request:', error);
        alert('Failed to respond to leave request.');
      },
    });
  }
}
