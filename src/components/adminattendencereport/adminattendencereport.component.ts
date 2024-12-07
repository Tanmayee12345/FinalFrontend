import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.attendanceReport = response;
      },
      error: (error) => {
        console.error('Failed to load attendance report:', error);
      }
    });
  }
}

