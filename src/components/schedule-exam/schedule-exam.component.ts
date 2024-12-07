import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-exam',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './schedule-exam.component.html',
  styleUrl: './schedule-exam.component.scss'
})




export class ScheduleExamComponent implements OnInit {
  classes: any[] = []; // List of all classes
  selectedClassId: string = ''; // Selected class ID
  courses: any[] = []; // List of courses under the selected class
  selectedCourseId: string = ''; // Selected course ID
  examDate: string = ''; // Exam date
  startTime: string = ''; // Exam start time
  endTime: string = ''; // Exam end time
  successMessage: string = ''; // Success message
  errorMessage: string = ''; // Error message

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    const apiUrl = 'http://localhost:8091/api/exams/classes';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.classes = response;
      },
      error: (err) => {
        console.error('Error loading classes:', err);
      },
    });
  }

  loadCourses() {
    const apiUrl = `http://localhost:8091/api/exams/classes/${this.selectedClassId}/courses`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      },
    });
  }

  scheduleExam() {
    const apiUrl = `http://localhost:8091/api/exams/schedule/${this.selectedClassId}/${this.selectedCourseId}`;
    const scheduleData = {
      examDate: this.examDate,
      startTime: this.startTime,
      endTime: this.endTime,
    };

    this.http.post(apiUrl, scheduleData,{ responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage = `Exam scheduled successfully for course ${this.selectedCourseId}!`;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Failed to schedule exam', err);
        this.errorMessage = 'Failed to schedule exam. Please try again.';
        this.successMessage = '';
      },
    });
  }
}

