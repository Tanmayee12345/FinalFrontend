import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminattendencereport',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './adminattendencereport.component.html',
  styleUrl: './adminattendencereport.component.scss'
})




export class AdminattendencereportComponent implements OnInit {
  attendanceReport: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAttendanceReport();
  }

  loadAttendanceReport() {
    const apiUrl = 'http://localhost:8091/api/attendance/report';
  
    // Retrieve the JWT token from localStorage
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlciBbVXNlcm5hbWU9dXNlciwgUGFzc3dvcmQ9W1BST1RFQ1RFRF0sIEVuYWJsZWQ9dHJ1ZSwgQWNjb3VudE5vbkV4cGlyZWQ9dHJ1ZSwgQ3JlZGVudGlhbHNOb25FeHBpcmVkPXRydWUsIEFjY291bnROb25Mb2NrZWQ9dHJ1ZSwgR3JhbnRlZCBBdXRob3JpdGllcz1bUk9MRV9VU0VSXV0iLCJpYXQiOjE3MzM1NzAyMjYsImV4cCI6MTczMzYwNjIyNn0.dq2_FKJEXub1Fw-SEhVnrr3c9nhJmHsZbwynT1ZSkr8"
    console.log(token);
  
    // Add the Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    // Make the HTTP GET request with the headers
    this.http.get<any[]>(apiUrl, { headers }).subscribe({
      next: (response) => {
        this.attendanceReport = response;
      },
      error: (error) => {
        console.error('Failed to load attendance report:', error);
      }
    });
  }
}






