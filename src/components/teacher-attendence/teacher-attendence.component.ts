import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-teacher-attendance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teacher-attendence.component.html',
  styleUrls: ['./teacher-attendence.component.scss'],
})
export class TeacherAttendenceComponent implements OnInit {
  teacherId = ''; // This should come from AuthService after login
  classesAndStudents: { [className: string]: { id: string; name: string }[] } = {};
  selectedClass = ''; // Currently selected class
  selectedStudentId = ''; // Currently selected student
  attendanceData = { status: true, comments: '' }; // Attendance data for a single student
  isLoading = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    this.teacherId = this.authService.getTeacherId();
    if (this.teacherId) {
      this.loadClassesAndStudents();
    } else {
      console.error('Teacher ID is missing. Please log in again.');
    }
  }

  loadClassesAndStudents() {
    const apiUrl = `http://localhost:8091/api/schedule/teacher/${this.teacherId}/classesStudents`;
    this.isLoading = true;

    this.http.get<{ [className: string]: { id: string; name: string }[] }>(apiUrl).subscribe({
      next: (response) => {
        this.classesAndStudents = response;
        console.log(this.classesAndStudents);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching classes and students:', error);
        this.isLoading = false;
      },
    });
  }

submitAttendance() {
  if (!this.selectedClass || !this.selectedStudentId) {
    alert('Please select a class and a student.');
    return;
  }

  const apiUrl = `http://localhost:8091/api/attendance/teacher/${this.teacherId}/class/${this.selectedClass}/student/${this.selectedStudentId}`;
  this.http.post(apiUrl, this.attendanceData, { responseType: 'text' }).subscribe({
    next: (response) => {
      console.log('Response:', response);
      alert('Attendance marked successfully.');
      this.attendanceData = { status: true, comments: '' }; // Reset form
    },
    error: (error) => {
      console.error('Error marking attendance:', error);
      if (error.status === 409) {
        alert('Attendance has already been marked for this student today.');
      } else {
        alert('Failed to mark attendance.');
      }
    },
  });
}

  
  }

