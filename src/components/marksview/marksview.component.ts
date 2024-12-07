import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-marksview',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './marksview.component.html',
  styleUrls: ['./marksview.component.scss'],
})
export class MarksviewComponent implements OnInit {
  studentId: string = ''; // Logged-in student's ID from AuthService
  studentName: string = ''; // To store the student's name
  marksData: { teacherName: string; courseName: string; marks: number; grade: string }[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // Retrieve studentId from AuthService
    this.studentId = this.authService.getStudentId();
    if (this.studentId) {
      this.fetchStudentName(); // Fetch student name
      this.fetchMarksData(); // Fetch marks data
    } else {
      alert('Student ID not found. Please log in again.');
    }
  }

  fetchStudentName() {
    const profileApiUrl = `http://localhost:8091/api/students/profile/${this.studentId}`;
    this.http.get<{ name: string }>(profileApiUrl).subscribe({
      next: (response) => {
        
        this.studentName = response.name;
        console.log(this.studentName);
      },
      error: (error) => {
        console.error('Error fetching student name:', error);
        this.studentName = 'Unknown'; // Fallback in case of an error
      },
    });
  }
 
  fetchMarksData() {
    // this.studentId=this.studentName;
    // console.log(this.studentId);
   

    const marksApiUrl = `http://localhost:8091/api/timetable/student/${this.studentId}/marks`;
    this.http
      .get<{ teacherName: string; courseName: string; marks: number; grade: string }[]>(marksApiUrl)
      .subscribe({
        next: (response) => {
          this.marksData = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching marks data:', error);
          this.isLoading = false;
          alert('Error fetching your marks. Please try again later.');
        },
      });
  }
}
