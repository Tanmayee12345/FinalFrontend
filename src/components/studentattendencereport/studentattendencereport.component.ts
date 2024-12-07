import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentattendencereport',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './studentattendencereport.component.html',
  styleUrl: './studentattendencereport.component.scss'
})

export class StudentattendencereportComponent implements OnInit {
  attendanceReport: any = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const studentId = this.authService.getStudentId();
    this.loadAttendanceReport(studentId);
  }

  loadAttendanceReport(studentId: string) {
    const apiUrl = `http://localhost:8091/api/attendance/student/${studentId}/report`;
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        this.attendanceReport = response;
      },
      error: (error) => {
        console.error('Failed to load attendance report:', error);
      }
    });
  }
}
