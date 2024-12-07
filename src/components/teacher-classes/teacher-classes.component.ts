import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth-service.service'; // Import AuthService

@Component({
  selector: 'app-teacher-classes',
  standalone: true,
  imports: [MatCardModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.scss'],
})
export class TeacherClassesComponent implements OnInit {
  teacherId: string = ''; // Retrieve from AuthService
  classesAndStudents: { [className: string]: string[] } = {}; // Data for classes and students
  isLoading: boolean = false;

  // Modal data
  isModalOpen: boolean = false;
  selectedClassName: string = '';
  selectedStudentId: string = '';
  marks: number | null = null;
  grade: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    this.teacherId = this.authService.getTeacherId();
    console.log('Logged-in Teacher ID:', this.teacherId);

    if (this.teacherId) {
      this.fetchClassesAndStudents();
    } else {
      console.error('Teacher ID is missing. Please log in again.');
    }
  }

  fetchClassesAndStudents() {
    const apiUrl = `http://localhost:8091/api/schedule/teacher/${this.teacherId}/classes-students`;
    this.isLoading = true;

    this.http.get<{ [className: string]: string[] }>(apiUrl).subscribe({
      next: (response) => {
        console.log('Classes and Students:', response);
        this.classesAndStudents = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching classes and students:', error);
        this.isLoading = false;
      },
    });
  }

  openAddMarksModal(className: string, studentId: string) {
    this.selectedClassName = className;
    this.selectedStudentId = studentId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedClassName = '';
    this.selectedStudentId = '';
    this.marks = null;
    this.grade = '';
  }

 submitMarksAndGrade() {
  if (!this.marks || !this.grade) {
    alert('Please enter marks and grade!');
    return;
  }

  const apiUrl = 'http://localhost:8091/api/timetable/add-marks';
  const payload = {
    teacherId: this.teacherId,
    classId: this.selectedClassName,
    studentId: this.selectedStudentId,
    marks: +this.marks, // Ensure numeric value
    grade: this.grade.trim(), // Remove extra spaces
  };

  console.log('Payload:', payload);

  this.http.post(apiUrl, payload, { observe: 'response',responseType: 'text' }).subscribe({
    next: (response) => {
      if (response.status === 200) {
        alert('Marks and grade added successfully!');
        this.closeModal();
        this.fetchClassesAndStudents(); // Reload the data
      } else {
        console.error('Unexpected response:', response);
        alert('Unexpected response received. Please check the logs.');
      }
    },
    error: (error) => {
      console.error('Error adding marks and grade:', error);
      if (error.status === 400) {
        alert('Bad request: Please check the input data.');
      } else if (error.status === 500) {
        alert('Internal server error. Please try again later.');
      } else {
        alert('Error.');
      }
      this.closeModal();
      this.fetchClassesAndStudents(); // Reload the data
    },
  });
}

  
}
