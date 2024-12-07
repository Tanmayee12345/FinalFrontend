import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface TeacherData {
  teacherName: string;
  classes: { [classId: string]: string[] }; // Mapping of class IDs to student arrays
}

@Component({
  selector: 'app-teacher-classes-students',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './teacher-classes-students.component.html',
  styleUrls: ['./teacher-classes-students.component.scss'],
})
export class TeacherClassesStudentsComponent implements OnInit {
  teachersData: TeacherData[] = []; // Data for teachers, classes, and students
  isModalOpen: boolean = false;
  selectedTeacherId: string = ''; // Changed from `selectedTeacherName` to `selectedTeacherId`
  selectedClassId: string = ''; // Changed from `selectedClassName` to `selectedClassId`
  selectedStudentId: string = ''; // Changed from `selectedStudentName` to `selectedStudentId`
  marks: number | null = null;
  grade: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTeachersClassesAndStudents();
  }

  fetchTeachersClassesAndStudents() {
    const apiUrl = 'http://localhost:8091/api/timetable/teachers-classes-students-marks';
    this.http.get<TeacherData[]>(apiUrl).subscribe({
      next: (response) => {
        this.teachersData = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        alert('Error fetching data!');
      },
    });
  }

  openAddMarksModal(teacherId: string, classId: string, studentId: string) {
    this.selectedTeacherId = teacherId;
    this.selectedClassId = classId;
    this.selectedStudentId = studentId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedTeacherId = '';
    this.selectedClassId = '';
    this.selectedStudentId = '';
    this.marks = null;
    this.grade = '';
  }

  submitMarks() {
    // Validate that marks and grade are entered
    if (!this.marks || isNaN(+this.marks) || !this.grade.trim()) {
      alert('Please enter valid marks and grade!');
      return;
    }
  
    const apiUrl = 'http://localhost:8091/api/timetable/add-marks';
    const payload = {
      teacherId: this.selectedTeacherId,
      classId: this.selectedClassId,
      studentId: this.selectedStudentId,
      marks: +this.marks, // Convert to number
      grade: this.grade.trim(), // Trim any whitespace
    };
  
    console.log('Payload:', payload); // Debugging purpose
  
    this.http.post(apiUrl, payload).subscribe({
      next: () => {
        alert('Marks and grade added successfully!');
        this.closeModal();
      },
      error: (error) => {
        console.error('Error adding marks and grade:', error);
        alert('Error adding marks and grade! Check the console for details.');
      },
    });
  }
  
}
