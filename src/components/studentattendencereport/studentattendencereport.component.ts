import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-studentattendencereport',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule],
  templateUrl: './studentattendencereport.component.html',
  styleUrl: './studentattendencereport.component.scss',
})






export class StudentattendencereportComponent implements OnInit {
  attendanceSummary: any[] = [];
  attendancePercentage: number = 0;
  topTeacherId: string = '';
  isLoading = true;
  studentId:string='';

  private chart: Chart | undefined;

  constructor(private http: HttpClient,private authService: AuthService) {
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
        this.attendancePercentage = response.attendancePercentage || 0;
        this.topTeacherId = response.teachers.length > 0 ? response.teachers[0].teacherId : '';
        this.isLoading = false;

        setTimeout(() => this.initializePieChart(), 0);
      },
      error: (error) => {
        console.error('Failed to load attendance summary:', error);
        this.isLoading = false;
      },
    });
  }

  initializePieChart() {
    const canvas = document.getElementById('attendanceChart') as HTMLCanvasElement;

    if (canvas) {
      if (this.chart) {
        this.chart.destroy(); // Destroy any previous chart instances
      }

      this.chart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: ['Present', 'Absent'],
          datasets: [
            {
              data: [this.attendancePercentage, 100 - this.attendancePercentage],
              backgroundColor: ['#4CAF50', '#FF5252'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow custom dimensions
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }
}
