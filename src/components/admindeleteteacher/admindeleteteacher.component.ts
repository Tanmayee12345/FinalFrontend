import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../service/teacher.service'; // Adjust the path if needed
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindeleteteacher',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admindeleteteacher.component.html',
  styleUrl: './admindeleteteacher.component.scss'
})




export class AdmindeleteteacherComponent implements OnInit {
  teachers: any[] = []; // Array to hold the active teachers

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadActiveTeachers();
  }

  // Load the active teachers from the backend
  loadActiveTeachers(): void {
    this.teacherService.getActiveTeachers().subscribe({
      next: (response) => {
        this.teachers = response;
        console.log('Active teachers:', this.teachers);
      },
      error: (error) => {
        console.error('Error fetching teachers:', error);
        alert('Failed to load teachers.');
      },
    });
  }

  // Delete teacher by ID
  deleteTeacher(teacherId: string): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacherById(teacherId).subscribe({
        next: (response) => {
          alert(response); // Show backend response
          this.loadActiveTeachers(); // Reload teachers list after deletion
        },
        error: (error) => {
          console.error('Error deleting teacher:', error);
          alert('Failed to delete the teacher.');
        },
      });
    }
  }
}

