import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-studentattendencereport',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCard],
  templateUrl: './studentattendencereport.component.html',
  styleUrls: ['./studentattendencereport.component.scss'],
})
export class StudentattendencereportComponent implements OnInit {
  attendanceSummary: any[] = [];
  isLoading = true;
  studentId: string = '';

  private chart: Chart | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId();
    this.loadAttendanceReport();
  }

  loadAttendanceReport() {
    const apiUrl = `http://localhost:8091/api/attendance/student/${this.studentId}/report`;

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        this.attendanceSummary = response.teachers || [];
        this.isLoading = false;

        // After the data is loaded, render the charts
        setTimeout(() => this.initializePieCharts(), 0);
      },
      error: (error) => {
        console.error('Failed to load attendance summary:', error);
        this.isLoading = false;
      },
    });
  }

  initializePieCharts() {
    // Loop through each teacher and create the pie chart
    this.attendanceSummary.forEach((item, index) => {
      const canvas = document.getElementById('attendanceChart' + index) as HTMLCanvasElement;

      if (canvas) {
        const chart = new Chart(canvas, {
          type: 'pie',
          data: {
            labels: ['Present', 'Absent'],
            datasets: [
              {
                data: [item.attendancePercentage, 100 - item.attendancePercentage],
                backgroundColor: ['#4CAF50', '#FF5252'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      }
    });
  }
}
